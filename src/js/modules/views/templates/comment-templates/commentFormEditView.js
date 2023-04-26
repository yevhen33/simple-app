import { BasicForm } from "../../models/forms/baseForm";
import { formEditComment } from "../form-content/formEditComment";
import { elementCreate } from "../../../helper/utils/elementCreate";

export function commentFormEditView(comment) {

    const wrapper = elementCreate({elem: "div", class: "comment-edit-form"});

    const editCommentForm = new BasicForm({
        parent: wrapper,
        class: 'form-comment-edit',
        id: 'comment-edit',
        content: formEditComment(comment.content),
        btn: 'Edit',
        user: comment._id
    });

    editCommentForm.validateForm();

    return editCommentForm.render();

}