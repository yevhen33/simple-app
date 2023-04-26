import { Base } from "./baseView";
import {DataService} from "../../../services/dataService";
import {homePage} from "../../templates/homePage";
import {currentUserView} from "../../templates/currentPage";
import { userDelete } from "../../../services/user-service/userDelete";

export class UserPage extends Base {
    constructor(template, data) {
        super(template);
        this.data = data;
    }
    async deleteUser() {
        addEventListener('click', (e) => {
            userDelete(e, "#login");
        });
    }
    changeUser() {
        addEventListener('click', (e) => {
            const changeBtn = e.target;
            if(changeBtn.dataset.event === "change") {
                
                const user = changeBtn.dataset.user;

                window.location.hash = `#change:${user}`;
            }
        });
    }
    render() {
        document.getElementById('root').classList.add('main');
        document.querySelector('header').classList.add('active'); 
        this.deleteUser();
        this.changeUser();
        
        return this.template(this.data());
    }

}

export const indexPage = new UserPage(homePage, DataService.getCurrent);

export const currentUserPage = new UserPage(currentUserView, DataService.getCurrent);