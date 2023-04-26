import { elementCreate } from "../../../helper/utils/elementCreate";
import { CommentService } from "../../../services/commentService";

export function commentChangeView(comment, userID, parent, form) {

    const wrapper = elementCreate({elem: "div", class: "comment-change"});

    if(comment.author._id === userID) {
        const edit = elementCreate({
            elem: "div",
            class: "comment-change_event",
            content: `<img src="./img/comment-edit.svg" alt="edit comment">`});
        const delet = elementCreate({
            elem: "div",
            class: "comment-change_event",
            content: `<img src="./img/comment-delete.svg" alt="delete comment">`});
            
        edit.addEventListener('click', async () => {
            await CommentService.editContentComment(edit, comment._id, parent, form, ".comment-elem_text");
        });
        delet.addEventListener('click', async () => {
            await CommentService.deleteComment(comment);
            delet.closest(parent).remove();
        });
        
        wrapper.append(edit);
        wrapper.append(delet);
    }

    return wrapper;
}