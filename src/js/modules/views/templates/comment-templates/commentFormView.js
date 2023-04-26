import { BasicForm } from "../../models/forms/baseForm";
import { formComment } from "../form-content/formComment";
import { elementCreate } from "../../../helper/utils/elementCreate";

export function commentFormView(post) {

    const wrapper = elementCreate({elem: "div", class: "comment-form"});

    const commentForm = new BasicForm({
        parent: wrapper,
        class: 'form-comment',
        id: 'comment',
        title: 'Add comment',
        content: formComment(),
        btn: 'Comment',
        user: post
    });

    commentForm.validateForm();

    return commentForm.render();

}