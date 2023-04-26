import {DataService} from "../../dataService";
import { ERRORSFORM } from "../../../helper/variables";

export async function createUser($form) {
    let user = {};
    const file = $form.querySelector('[name="foto"]').files[0];
    const inputs = $form.querySelectorAll('input');
        inputs.forEach(item => {
            if(item.name) {
                user[item.name] = item.value;
            }
        });

    user.foto = file ? await DataService.uploadUserImg(file) : '';

    const USERS = await DataService.getUsersList();
    let userBan = "";
    USERS.forEach(item => {
        if(item.login === user.login) {
            userBan = user.login;
        }
    });
    if(userBan.length > 0) {
        $form.querySelector('.form-error').classList.add('show');
        $form.querySelector('.form-error').innerHTML = ERRORSFORM.existUser;
    } else {
        await DataService.addNewUser(user);
        window.location.hash = "#login";
    }
}



