import { Base } from "./baseView";
import { DataService} from "../../../services/dataService";
import {allUsersPage} from "../../templates/allUsersPage";
import {userDelete} from "../../../services/user-service/userDelete";

class UserList extends Base {
    constructor(template, data, dataAll) {
        super(template);
        this.data = data();
        this.dataAll = dataAll;
        
    }
    async deleteUser() {
        addEventListener('click', (e) => {
            userDelete(e, "#all");
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
    async render() {
        document.getElementById('root').classList.add('main');
        document.querySelector('header').classList.add('active');
        const USERS = await this.dataAll();
        let listUsers = document.createElement('div');
        listUsers.innerHTML = `<h1>All Users Data</h1><br><br><br>`;

        USERS.forEach(user => {
            if(user.login != this.data.login) {
                listUsers.append(this.template(user));
            }
        });
        this.deleteUser();
        this.changeUser();
        return listUsers;
    }
}

export const allPage = new UserList(allUsersPage, DataService.getCurrent, DataService.getUsersList);