import { elementCreate } from "../../../helper/utils/elementCreate";
import { getTimeDiff } from "../../../helper/utils/getTimeDiff";

export async function commentTitleView(post, Data) {
    const wrapper = elementCreate({elem: "div", class: "comment-info"});
    const title = elementCreate({elem: "h1", class: "comment-title", text: "Comments"});
    wrapper.append(title);

    const info = await Data.getCommentTitle(post);

    const content = elementCreate({elem: "div", class: "comment-cont"});
    const user = elementCreate({
        elem: "div", 
        class: "comment-cont_user", 
        content: `<div class="comment-cont_user_img"><img src="${info.user.foto}" alt="${info.user.name}"></div>
            <div class="comment-cont_user_name">${info.user.name}</div>`
        });
    content.append(user);

    const datePost = getTimeDiff(info.created);

    const postContent = elementCreate({
        elem: "div",
        class: "comment-cont_post",
        content: `<div class="comment-cont_post_title">${info.titlePost}</div>
            <div class="comment-cont_post_descr">${info.descriptionPost}</div>
            <div class="comment-cont_post_date">${datePost}</div>`
        });
    content.append(postContent);

    wrapper.append(content);

    return wrapper;
}