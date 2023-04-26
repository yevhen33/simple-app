import { BasicForm } from "../models/forms/baseForm";
import { loginContent } from "./form-content/formLogin";
export function logPage() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-form');

    const loginForm = new BasicForm({
        parent: wrapper,
        class: 'form',
        id: 'user-login',
        title: 'Sing in',
        bottonText: 'If you are not already registered, <br> please',
        changeText: 'register',
        content: loginContent,
        btn: 'Entry',
        location: '#register',
    });

    loginForm.validateForm();
    loginForm.showPassword();

    return loginForm.render();
}