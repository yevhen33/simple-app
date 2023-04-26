import { User } from "../views/models/users/baseUser";

export const DataService = {
    sendRequest: async (path, method, body) => {

        const formData = new FormData();
        for (const key in body) {
            formData.append(key, body[key]);
        }
        return await fetch(path, {
            method: method,
            body: body ? formData : null,
        })
        .then(response => response.json())
        .catch(error => {
            throw new Error(error);
        });
    },
    installCurrentUser: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    getCurrent: () => JSON.parse(localStorage.getItem('currentUser')),
    currentUser: () => {
        const userData = DataService.getCurrent();
        const currentUser = userData ? new User(userData).createCurrentUser() : false;
        return currentUser;
    },
    installCurrentPagePosts: (page) => {
        localStorage.setItem('currentPagePosts', JSON.stringify(page));
    },
    getCurrentPagePosts: () => JSON.parse(localStorage.getItem('currentPagePosts')),
    installFilterPosts: (filter) => {
        localStorage.setItem('filterPosts', JSON.stringify(filter));
    },
    getFilterPosts: () => JSON.parse(localStorage.getItem('filterPosts')),
    installPaginationLimit: (limit) => {
        localStorage.setItem('paginationLimit', JSON.stringify(limit));
    },
    getPaginationLimit: () => JSON.parse(localStorage.getItem('paginationLimit')),
    getUsersList: () => {
        return DataService.sendRequest("/get-users-list", 'GET');
    },
    findUser: (params) => {
        return DataService.sendRequest("/get-user", 'POST', params);
    },
    findUserID: (id) => {
        return DataService.sendRequest("/get-user-id", 'POST', {_id: id});
    },
    addNewUser: (user) => {
        return DataService.sendRequest("/new-user", 'POST', user);
    },
    deleteUser: (id) => {
        return DataService.sendRequest("/delete-user", "DELETE", {_id: id});
    }, 
    upDataUser: (user) => {
        return DataService.sendRequest("/change-user", 'POST', user);
    },
    uploadUserImg: (img) => {
        return DataService.sendRequest("/upload-img", 'POST', {'foto': img});
    },
    deleteUserImg: (img) => {
        return DataService.sendRequest('/delete-img', 'DELETE', {'img': img});
    },
    addNewPost: (post) => {
        return DataService.sendRequest('/new-post', 'POST', post);
    },
    getAllPosts: () => { 
        return DataService.sendRequest('/get-all-posts', 'GET');
    },
    findPostID: (id) => {
        return DataService.sendRequest("/get-post", 'POST', {_id: id});
    },
    deletePost: (id) => {
        return DataService.sendRequest("/delete-post", "DELETE", {_id: id});
    },
    countPosts: async () => {
        return DataService.sendRequest('/get-count-posts', 'GET');
    },
    countMyPosts: async (id) => {
        return DataService.sendRequest('/get-count-my-posts', 'POST', {_id: id});
    },
    filterPostsId: (id, page, limit) => {
        return DataService.sendRequest("/get-posts-id", "POST", {_id: id, currentPage: page, limit: limit});
    },
    filterDatePosts: (page, limit, filter) => {
        return DataService.sendRequest("/get-date-posts", "POST", {currentPage: page, limit: limit, filter: filter});
    },
    editPostData: (post) => {
        return DataService.sendRequest("/edit-post", 'POST', post);
    },
    updateLikes: (id, likes) => {
        return DataService.sendRequest("/update-likes", 'POST', {_id: id, likes: likes});
    },
    likesPostID: (id) => {
        return DataService.sendRequest("/get-post-likes", 'POST', {_id: id});
    },
    getCommentTitle: (id) => {
        return DataService.sendRequest("/get-comment-title", 'POST', {_id: id});
    },
    addNewComment: (comment) => {
        return DataService.sendRequest('/new-comment', 'POST', comment);
    },
    getCommentsPost: (id) => {
        return DataService.sendRequest("/get-comments-post", "POST", {_id: id});
    },
    deleteComment: (id) => {
        return DataService.sendRequest("/delete-comment", "DELETE", {_id: id});
    },
    findCommentID: (id) => {
        return DataService.sendRequest("/get-comment", 'POST', {_id: id});
    },
    editComment: (id, content) => {
        return DataService.sendRequest("/edit-comment", 'POST', {_id: id, content: content});
    },
    updateCommentLikes: (id, user, flag) => {
        return DataService.sendRequest("/update-comment-likes", "POST", {_id: id, user: user, flag: flag});
    },
    likesCommentID: (id) => {
        return DataService.sendRequest("/get-comment-likes", 'POST', {_id: id});
    },
    deleteReplyComments: (id) => {
        return DataService.sendRequest("/delete-comments-reply", "DELETE", {_id: id});
    },
    // delete user and all posts, comments
    deleteCommentsPost: (id) => {
        return DataService.sendRequest("/delete-comments-post", "DELETE", {_id: id});
    },
    getCommentsUser: (id) => {
        return DataService.sendRequest("/get-comments-user", "POST", {_id: id});
    },
    deleteCommentsUser: (id) => {
        return DataService.sendRequest("/delete-comments-user", "DELETE", {_id: id});
    },
    deletePostsUser: (id) => {
        return DataService.sendRequest("/delete-posts-user", "DELETE", {_id: id});
    },
    addFiltersImg: (src, filter) => {
        return DataService.sendRequest("/img-filter-add", "POST", {imgSrc: src, imgFilter: filter});
    }
};
