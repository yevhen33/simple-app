import { elementCreate } from "../../../helper/utils/elementCreate";
import { getTimeDiff } from "../../../helper/utils/getTimeDiff";
import { commentFormReplyView } from "./commentFormReplyView";
import { CommentService } from "../../../services/commentService";

export async function commentBottom(comment, userID, parentSelector) {
    const dateComment = getTimeDiff(comment.created);

    const wrapper = elementCreate({
        elem: 'div',
        class: "comment-bottom",
        content: `<div class="comment-bottom_date">${dateComment}</div>`
    });

    const likeBlock = await CommentService.addLikeBlock(comment, userID);
    wrapper.append(likeBlock);

    const reply = elementCreate({elem: "div", class: "comment-bottom_reply", text: "Reply"});
    const title = elementCreate({elem: "div", class: "comment-form_title", text: `You reply @${comment.author.name}`});
    const close = elementCreate({
        elem: "div",
        class: "comment-form_close",
        content: `<img src="./img/close.svg" alt="close">`
    });
    title.append(close);


    reply.addEventListener("click", () => {
        const form = document.querySelector("#reply-block");

        form?.remove();
        
        const replyForm = commentFormReplyView(comment);
        replyForm.append(title);

        close.addEventListener('click', () => replyForm.remove());
        
        const parent = reply.closest(parentSelector);
        parent.append(replyForm);
    });
    wrapper.append(reply);

    return wrapper;
}