import { FORMS, ERRORSFORM } from "../../helper/variables";
import { loginUser } from "./auth/userLogin";
import { createUser } from "./auth/userRegister";
import {changeUser} from "./user/userChange";
import { createPost } from "./post/createPost";
import { editPost } from "./post/editPost";
import { commentPost } from "./comment/commentPost";
import { editComment } from "./comment/editComment";
import { replyComment } from "./comment/replyComment";
import { chatMessage } from "./chat/chatMessage";
import submitForms from "../../helper/utils/validation";


function singIn(e) {
    
    const $form = e.target,
          formError = $form.querySelector('.form-error');
    let chooseForm;
    e.preventDefault();

    const submit = submitForms($form);

    if(submit) {
        chooseForm = $form.id;
    } else {
        formError.classList.add('show');
        formError.innerHTML = ERRORSFORM.fildError;
        return;
    }
    
    switch(chooseForm) {
        case FORMS.login:
            loginUser($form);
            break;
        case FORMS.register:
            createUser($form);
            break;
        case FORMS.change:
            changeUser($form);
            break;
        case FORMS.post:
            createPost($form);
            break;
        case FORMS.editPost:
            editPost($form);
            break;
        case FORMS.comment:
            commentPost($form);
            break;
        case FORMS.editComment:
            editComment($form);
            break;
        case FORMS.reply:
            replyComment($form);
            break;
        case FORMS.chat:
            chatMessage($form);
            break;
        default:
            formError.classList.add('show');
            formError.innerHTML = ERRORSFORM.something;
    }
}

export default singIn;

