import { elementCreate } from "../../helper/utils/elementCreate";

export async function feedPosts(post, Data, Services) {
    const ID = Data.getCurrent()._id;
    let likeClass = "feed-post_like";
    const editPost = ID === post.user._id ? `
        <div class="feed-post_edit">
            <img src="./img/edit.svg" alt="edit post" data-event="post-edit" data-post="${post._id}">
        </div>
        <div class="feed-post_delete">
            <img src="./img/delete.svg" alt="delete post" data-event="post-delete" data-post="${post._id}">
        </div>` : "";
    post.likes.forEach(like => {
        if(like === ID) {
            likeClass = "feed-post_like like";
        }
    });
    const likePost = `<div class="${likeClass}" data-event="post-like" data-post="${post._id}" id="like">
    </div>`;

    const filterImg = `<div class="feed-img_filter">Add filter on photo</div>`;

    const postDate = new Date(post.created).toUTCString();

    const comments = await this.Data.getCommentsPost(post._id);
    const commentCounter = comments.length > 0 ? `Comments: ${comments.length}` : "";

    const wrapper = elementCreate({
        elem: "div", 
        class: "feed-post",
        content: `
            <div class="feed-img ${ID === post.user._id ? "filterImg" : ""}">
                ${filterImg}
                <img src="${post.imageSrc}" alt="post">
            </div>
            <div class="feed-post_info">
                <h3 class="feed-post_name">${post.user.name}</h3>
                <div class="feed-post_event">
                ${editPost}
                </div>
            </div>
            <div class="feed-post_action">
                ${likePost}
                <div class="feed-post_comment" data-post="${post._id}" id="comment"></div>
            </div>
            <div class="feed-post_counter">Like: <span class="likes-counter">${post.likes.length}</span><div>${commentCounter}</div></div>
            <h2 class="feed-post_title">${post.titlePost}</h2>
            <p class="feed-post_descr">${post.descriptionPost}</p>
            <div class="feed-post_date">${postDate}</div>`
    });

    const like = wrapper.querySelector("#like");
    const counter = wrapper.querySelector('.feed-post_counter .likes-counter');
    const comment = wrapper.querySelector('#comment');
    const addFilter = wrapper.querySelector('.feed-img_filter');
    like.addEventListener('click', () => {
        Services.postLike(like, counter);
    }); 

    counter.addEventListener('click', async () => {
        const postLikes = await Data.likesPostID(post._id);
        Services.showLikes(counter, ".feed-post", postLikes.likes, "Users like post");
    });

    comment.addEventListener('click', () => {
        const post = comment.dataset.post;
        window.location.hash = `#comments:${post}`;
    });

    addFilter.addEventListener('click', () => {
        window.location.hash = `#photofilter:${post._id}`;
    });
    
    return wrapper; 
}