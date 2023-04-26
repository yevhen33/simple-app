import { DataService } from "../../dataService";
import { CommentView } from "../../../views/templates/comment-templates/commentView";

export async function commentPost($form) {
    let comment = {};
    const post = $form.querySelector('.form-title span').textContent,
          user = DataService.getCurrent()._id,
          content = $form.querySelector('textarea[name="content"]'),
          parent = document.querySelector('.comment-content');

    comment.content = content.value;
    comment.author = user;
    comment.post = post;

    const newComment = await DataService.addNewComment(comment);
    const reply = [];
    const commentElement = await new CommentView(newComment, user, DataService, reply).render();

    parent.append(commentElement);
    
    $form.reset();
}