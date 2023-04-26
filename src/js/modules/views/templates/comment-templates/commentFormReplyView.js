import { BasicForm } from "../../models/forms/baseForm";
import { formReplyComment } from "../form-content/formReplyComment";
import { elementCreate } from "../../../helper/utils/elementCreate";

export function commentFormReplyView(comment) {

    const wrapper = elementCreate({elem: "div", class: "comment-form", id: "reply-block"});

    const commentReply = new BasicForm({
        parent: wrapper,
        class: 'form-comment',
        id: 'reply',
        content: formReplyComment(comment.author.name),
        btn: 'Reply',
        user: comment._id
    });

    commentReply.validateForm();

    return commentReply.render();

}