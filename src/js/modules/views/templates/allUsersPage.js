import { elementCreate } from "../../helper/utils/elementCreate";

export function allUsersPage(data) {
    
    const img =  data.foto ? data.foto : `./img/not-foto.png`;

    const wrapper = elementCreate({
        elem: "div",
        class: "user",
        content: `
            <div class="user-img"> <img src="${img}"> </div>
            Name user - ${data.name}, 
            login user -${data.login}, 
            id - ${data._id}
            <button class="btn btn-small" data-event="change" data-user="${data._id}">Change</button>
            <button class="btn btn-small" data-event="delete" data-user="${data._id}">Delete</button>`
    });
    
    return wrapper;
}