import { DataService } from "../../dataService";

export async function editPost($form) {
    const postId = $form.querySelector('.form-title span').textContent,
          file = $form.querySelector('[name="foto"]').files[0],
          inputs = $form.querySelectorAll('textarea'),
          post = await DataService.findPostID(postId);

    let postEdit = {};

    inputs.forEach(input => {
        postEdit[input.name] = input.value;
    });

    if (!!file) {
        postEdit.imageSrc = await DataService.uploadUserImg(file);
        postEdit.imageSrc = postEdit.imageSrc;
    }

    for (let key in postEdit) {
        post[key] = postEdit[key];
    }
    await DataService.editPostData(post);
    window.location.hash = "#feed";
}