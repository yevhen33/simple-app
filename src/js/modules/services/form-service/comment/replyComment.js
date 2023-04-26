import { DataService } from "../../dataService";
import { CommentReplyView } from "../../../views/templates/comment-templates/commentReplyView";

export async function replyComment($form) {
    let comment = {};
    const commentId = $form.querySelector('.form-title span').textContent,
          content = $form.querySelector('textarea[name="content"]').value,
          author = DataService.getCurrent()._id,
          parentComment = await DataService.findCommentID(commentId),
          formWrapper = $form.closest(".comment-form"),
          parent = formWrapper.closest(".comment-elem"),
          replyBlock = parent.querySelector('.comment-elem_reply'),
          nameAuthor = formWrapper.querySelector('.comment-form_title').textContent.split("@").pop();

    comment.content = content;
    comment.author = author;
    comment.post = parentComment.post;
    comment.commentID = commentId;

    const newComment = await DataService.addNewComment(comment);
    
    const newReply = await new CommentReplyView(newComment, author, DataService, nameAuthor).render();

    replyBlock.append(newReply);
    formWrapper.remove();
}