import { elementCreate } from "../../../helper/utils/elementCreate";
import { getTimeDiff } from "../../../helper/utils/getTimeDiff";
import { CommentService } from "../../../services/commentService";

export async function commentReplyBottom(comment, userID) {
    const dateComment = getTimeDiff(comment.created);

    const wrapper = elementCreate({
        elem: 'div',
        class: "comment-bottom, reply",
        content: `<div class="comment-bottom_date">${dateComment}</div>`
        });

    const likeBlock = await CommentService.addLikeBlock(comment, userID);
    wrapper.append(likeBlock);

    return wrapper;

}