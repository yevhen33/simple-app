import { DataService } from "../../dataService";

export async function editComment($form) {
    const commentId = $form.querySelector('.form-title span').textContent,
          content = $form.querySelector('textarea[name="content"]').value;
    
    await DataService.editComment(commentId, content);
}