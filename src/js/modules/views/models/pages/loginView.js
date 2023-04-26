import { Base } from "./baseView";
import {logPage} from "../../templates/logPage";

class LoginPage extends Base {
    constructor(template) {
        super(template);
    }
    
    render() {
        const $element = document.getElementById('root'),
              $header = document.querySelector('header');

        if($element.classList.contains('main')) {
            $element.classList.remove('main');
        }
        if($header.classList.contains('active')) {
            $header.classList.remove('active');
        }
        
        return this.template();
    }
}

export const logInPage = new LoginPage(logPage);