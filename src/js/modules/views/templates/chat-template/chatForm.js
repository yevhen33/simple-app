import { BasicForm } from "../../models/forms/baseForm";
import { elementCreate } from "../../../helper/utils/elementCreate";
import { formChat } from "../form-content/formChat";

export function chatFormView(name) {
    const wrapper = elementCreate({elem: "div", class: "chat-form_wrapper"});

    const chatForm = new BasicForm({
        parent: wrapper,
        class: 'form-chat',
        id: 'chat',
        content: formChat(),
        btn: 'Send',
        user: name
    });

    chatForm.validateForm();

    return chatForm.render();
}