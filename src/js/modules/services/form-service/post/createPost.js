import { DataService } from "../../dataService";

export async function createPost($form) {
    let postData = {};
    const file = $form.querySelector('[name="foto"]').files[0],
          inputs = $form.querySelectorAll('textarea'),
          userID = DataService.getCurrent()._id;

    inputs.forEach(input => {
        postData[input.name] = input.value;
    });
    postData.user = userID;
    postData.imageSrc = await DataService.uploadUserImg(file);

    await DataService.addNewPost(postData);
    window.location.hash = '#feed';

}