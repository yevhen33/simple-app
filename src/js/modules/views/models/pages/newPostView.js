import { Base } from "./baseView";
import {postUser} from "../../templates/newPostPage";

class NewPostUser extends Base {
    constructor(template) {
        super(template);
    }
    
    render() {
        return this.template();
    }
    
}

export const userNewPost = new NewPostUser(postUser);