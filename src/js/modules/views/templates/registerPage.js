import { BasicForm } from "../models/forms/baseForm";
import { registerContent } from "./form-content/formRegister";

export function regPage() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-form');

        const registerForm = new BasicForm({
        parent: wrapper,
        class: 'form',
        id: 'user-register',
        title: 'New User Registration',
        bottonText: 'Already registered<br>',
        changeText: 'Log in',
        content: registerContent,
        btn: 'register',
        location: '#login',
    });
    registerForm.validateForm();
    registerForm.showPassword();
    registerForm.uploadFoto();

    return registerForm.render();
}