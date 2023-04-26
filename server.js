'use strict';

const express = require('express');
const { unlink, existsSync } = require('fs');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require('./schemas/User');
const Post = require('./schemas/Post');
const Comment = require('./schemas/Comment');
const remoteUser = require('./schemas/remoteUser');
const Jimp = require('jimp');
const ImageFilters = require('./imageFilters');
const PORT = 5000;

connectDB(); // connect to MongoDB

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static('dist'));
app.use(express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() - Math.round(Math.random() * 1E8);
        cb(null, "user" + '-' + uniqueSuffix + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage }); 

// start work whith photo
app.post('/upload-img', upload.single('foto'), function (req, res, next) {
    res.send(JSON.stringify(req.file.filename));
        
});

app.delete("/delete-img", upload.none(), (req, res) => {
    if (existsSync(path.resolve(__dirname, "uploads", req.body.img))) { 
      unlink(path.resolve(__dirname, "uploads", req.body.img), (err) => console.log(err)); 
      res.send(JSON.stringify('Image deleted')); 
    }
});
// end work whith photo

// start work whith user
app.get("/get-users-list", async (req, res) => {
    let users;
    try {
        users = await User.find({});
    } catch (err) {
        throw err;
    }
    res.send(users);
}); 

app.post("/get-user", upload.none(), async (req, res) => {

    const user = await User.findOne({login:req.body.login, password:req.body.password}).exec();
    if (user) {
        res.send(user);
    } else {
        res.send(false);
    }
});
app.post("/get-user-id", upload.none(), async (req, res) => {

    const user = await User.findById(req.body._id).exec();
    if (user) {
        res.send(user);
    } else {
        res.send(false);
    }
});

app.post("/new-user", upload.none(), async (req, res) => {
    let user = new User(req.body);
    user.save();
    res.send(JSON.stringify(user));
});

app.delete("/delete-user", upload.none(), async (req, res) => {
    await User.findByIdAndRemove(req.body._id);
    res.send(JSON.stringify("Delete"));
});

app.post("/change-user", upload.none(), async (req, res) => {
    User.findByIdAndUpdate(req.body._id, req.body, (err, result) => {
        if(err) {
            throw err;
        }
        res.send(JSON.stringify(result));
    });
});
// end work whith user

// start work whith post
app.post("/new-post", upload.none(), async (req, res) => {
    let post = new Post(req.body);
    post.save();
    Post.populate(post, {path: "user"}) 
    .then(post => res.send(JSON.stringify(post)));
}); 
 
app.get("/get-all-posts", upload.none(), async (req, res) => {
    let posts;
    try {
        posts = await Post.find({}).populate({
            path: "user",
            select: {name: 1}
        }).exec();   
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify(posts));
});

app.post("/get-post", upload.none(), async (req, res) => {
    Post.findById(req.body._id, (err, result) => {
        if(err) {
            throw err;
        }
        res.send(JSON.stringify(result));
    });
});

app.delete("/delete-post", upload.none(), async (req, res) => {
    await Post.findByIdAndRemove(req.body._id);
    res.send(JSON.stringify("Delete Post"));
});

app.post("/get-posts-id", upload.none(), async (req, res) => {
    let posts;
    try {
        posts = await Post.find({user: req.body._id})
        .populate({
            path: "user",
            select: {name: 1}
        })
        .sort({created: -1})
        .limit(req.body.limit)
        .skip((req.body.currentPage - 1) * req.body.limit)
        .exec();   
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify(posts));
});

app.post("/get-date-posts", upload.none(), async (req, res) => {
    let posts;
    try {
        posts = await Post.find({})
        .populate({
            path: "user",
            select: {name: 1}
        })
        .sort({created: req.body.filter})
        .limit(req.body.limit)
        .skip((req.body.currentPage - 1) * req.body.limit)
        .exec();      
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify(posts));
});

app.get("/get-count-posts", upload.none(), async (req, res) => {
    const count = await Post.count({});
    res.send(JSON.stringify(count));
});

app.post("/get-count-my-posts", upload.none(), async (req, res) => {
    const count = await Post.countDocuments({user: req.body._id});
    res.send(JSON.stringify(count));
});

app.post("/edit-post", upload.none(), async (req, res) => {
    Post.findByIdAndUpdate(req.body._id, req.body, (err, result) => {
        if(err) {
            throw err;
        }
        res.send(JSON.stringify(result));
    });
});

app.post("/update-likes", upload.none(), async (req, res) => {
    
    let arr = JSON.parse(req.body.likes);

    Post.findByIdAndUpdate(req.body._id, {likes: arr}, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(JSON.stringify(result));
    });
});
 
app.post("/get-post-likes", upload.none(), async (req, res) => {
    let post;
    try {
        post = await Post.findById(req.body._id).populate({
            path: "likes",
            transform: (like) => like == null ? remoteUser : like,
            select: {name: 1, foto: 1}
        }).exec();   
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify(post));
});

app.delete("/delete-posts-user", upload.none(), async (req, res) => {
    try {
        await Post.deleteMany({user: req.body._id}).exec();  
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify("Delete Posts User"));
});

// end work whith posts

// start work whith comments
app.post("/get-comment-title", upload.none(), async (req, res) => {
    let post;
    try {
        post = await Post.findById(req.body._id).populate({
            path: "user",
            select: {name: 1, foto: 1}
        });
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify(post));
});

app.post("/new-comment", upload.none(), async (req, res) => {
    let comment = new Comment(req.body);
    comment.save();
    Comment.populate(comment, {path: "author",});
    Comment.populate(comment, {path: "post"})
    .then(comment => res.send(JSON.stringify(comment)));
}); 

app.post("/get-comments-post", upload.none(), async (req, res) => {
    let comments;
    try {
        comments = await Comment.find({post: req.body._id}).populate({
            path: "author",
            select: {name: 1, foto: 1}
        }).exec();   
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify(comments));
});

app.delete("/delete-comment", upload.none(), async (req, res) => {
    await Comment.findByIdAndRemove(req.body._id);
    res.send(JSON.stringify("Delete Comment"));
});

app.post("/get-comment", upload.none(), async (req, res) => {
    Comment.findById(req.body._id, (err, result) => {
        if(err) {
            throw err;
        }
        res.send(JSON.stringify(result));
    });
});

app.post("/edit-comment", upload.none(), async (req, res) => {
    Comment.findByIdAndUpdate(req.body._id, {content: req.body.content}, (err, result) => {
        if(err) {
            throw err;
        }
        res.send(JSON.stringify(result));
    });
});

app.post("/update-comment-likes", upload.none(), async (req, res) => {
    let update;
    if (req.body.flag === 'false') {
        update = {$push: {likes: req.body.user}};
    } else {
        update = {$pull: {likes: req.body.user}};
    }
    Comment.findByIdAndUpdate(req.body._id, update, {new: true}, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(JSON.stringify(result.likes));
    });
});

app.post("/get-comment-likes", upload.none(), async (req, res) => {
    let comment;
    try {
        comment = await Comment.findById(req.body._id).populate({
            path: "likes",
            transform: (like) => like == null ? remoteUser : like,
            select: {name: 1, foto: 1}
        }).exec();   
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify(comment));
});

app.delete("/delete-comments-reply", upload.none(), async (req, res) => {
    try {
        await Comment.deleteMany({commentID: req.body._id}).exec();  
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify("Delete Comment Reply"));
});

app.delete("/delete-comments-post", upload.none(), async (req, res) => {
    try {
        await Comment.deleteMany({post: req.body._id}).exec();  
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify("Delete Comments Post"));
});

app.delete("/delete-comments-user", upload.none(), async (req, res) => {
    try {
        await Comment.deleteMany({author: req.body._id}).exec();  
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify("Delete Comments User"));
});

app.post("/get-comments-user", upload.none(), async (req, res) => {
    let comments;
    try {
        comments = await Comment.find({author: req.body._id}).exec();   
    } catch (err) {
        throw err;
    }
    res.send(JSON.stringify(comments));
});
// end work whith comments

// start work whith Filters images

app.post("/img-filter-add", upload.none(), async (req, res) => {
    const filter = req.body.imgFilter;
    try {
        const image = await Jimp.read(req.body.imgSrc);
        ImageFilters[filter](image);
        await image.writeAsync(req.body.imgSrc);  
    } catch (err) {
        console.log(err);
    }
    res.send(JSON.stringify("image processed"));
});
// end work whith Filters images

const userlist = {}; 

io.on('connection', (socket) => {
    socket.on('connectUser', (data) => {
        socket.userId = data.userId;
            if(socket.userId in userlist) {
                return;
            } else {
                userlist[socket.userId] = data.userId; 
                UpdateUserList(); 
                socket.emit('newUserConnect', {descr: `Hey ${data.name}, welcome!`});
                socket.broadcast.emit('newUserConnect', {descr: `${data.name}, connected!`});
                socket.on('disconnect', () => {
                    socket.broadcast.emit('newUserConnect', {descr: `${data.name}, Disconnected!`});
                });
            } 
    });
    socket.on('disconnect', () => {
        delete userlist[socket.userId];
        UpdateUserList();
    });

    function UpdateUserList() {
        const size = Object.keys(userlist).length;
        io.sockets.emit('updateUsers', size);
    }
});

io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        io.emit('chat message', {
            message: data.message,
            name: data.name,
            userId: data.userId
        });
    });
});

io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId);
        });
    });
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    http.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
});
