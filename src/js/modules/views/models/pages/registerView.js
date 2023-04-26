import { Base } from "./baseView";
import { regPage } from "../../templates/registerPage";

export class RegisterPage extends Base {
    constructor(template) {
        super(template);
    }
    render() {
        return this.template();
    }
}

export const registerPage = new RegisterPage(regPage);