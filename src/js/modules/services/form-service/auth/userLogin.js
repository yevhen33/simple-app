import {DataService} from "../../dataService";
import { User } from "../../../views/models/users/baseUser";
import { ERRORSFORM } from "../../../helper/variables";

export async function loginUser($form) {
    let params = {};
    const login = $form.querySelector('#login').value,
          password = $form.querySelector('#password').value;

    params.login = login;
    params.password = password;

    const user = await DataService.findUser(params);

    if (user) {
        
        let currentUser = new User(user).createCurrentUser();

        DataService.installCurrentUser(currentUser);

        window.location.hash = "/";
        window.location.reload();
        
    } else {
        $form.querySelector('.form-error').classList.add('show');
        $form.querySelector('.form-error').innerHTML = ERRORSFORM.notUser;

    }
    
}