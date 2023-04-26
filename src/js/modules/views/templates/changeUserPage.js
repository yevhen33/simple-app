import { BasicForm } from "../models/forms/baseForm";
import { changeContent } from "./form-content/formChange"; 

export async function changeUser(data, Data) {
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapperChange';
    wrapper.classList.add('login');

    const changeForm = new BasicForm({
        parent: wrapper,
        class: 'form',
        id: 'user-change',
        title: 'Change data user',
        changeText: 'Exit',
        content: changeContent(await Data.findUserID(data)),
        btn: 'Change',
        user: data,
        location: 'javascript:history.go(-1);',
    });
    
    changeForm.validateForm();
    changeForm.showPassword(); 
    changeForm.uploadFoto();

    return changeForm.render();
}