import { BasicForm } from "../models/forms/baseForm";
import {postContent} from "./form-content/formNewPost";

export function postUser() {
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapperChange';
    wrapper.classList.add('post');

    const postForm = new BasicForm({
        parent: wrapper,
        class: 'form',
        id: 'new-post',
        title: 'Add a new post to the feed',
        changeText: 'Exit',
        content: postContent(),
        btn: 'Add post',
        location: '#feed',
    });
    
    postForm.validateForm();
    postForm.uploadFoto();

    return postForm.render();
}