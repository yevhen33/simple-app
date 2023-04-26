import { BasicForm } from "../models/forms/baseForm";
import { elementCreate } from "../../helper/utils/elementCreate";
import {editPostContent} from "./form-content/formEditPost";

export async function editPostView(post, Data) {

    const wrapper = elementCreate({elem: "div", class: "post", id: "wrapperChange"});

    const editForm = new BasicForm({
        parent: wrapper,
        class: 'form',
        id: 'post-edit',
        title: 'Edit post content',
        changeText: 'Exit',
        content: editPostContent(await Data.findPostID(post)),
        btn: 'Edit',
        user: post,
        location: '#feed',
    });

    editForm.validateForm();
    editForm.uploadFoto();

    return editForm.render();

}