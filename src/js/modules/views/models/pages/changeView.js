import { Base } from "./baseView";
import { DataService } from "../../../services/dataService";
import {changeUser} from "../../templates/changeUserPage";
import {editPostView} from "../../templates/editPostView";

class ChangeUser extends Base {
    constructor(template, Data) {
        super(template);
        this.Data = Data;
    }
    
    render(params) {
        return this.template(params, this.Data);
    }
    
}

export const userChange = new ChangeUser(changeUser, DataService);

export const editPost = new ChangeUser(editPostView, DataService);