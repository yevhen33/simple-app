import { elementCreate } from "../../helper/utils/elementCreate";

export function currentUserView(data) {

  const img = data.foto ? data.foto : `./img/not-foto.png`;

  const wrapper = elementCreate({
    elem: "div",
    class: "us",
    content: `
      <h1>Current User Data</h1> <br><br><br>
      <div class="user">
      <div class="user-img"><img src="${img}" alt="foto user"></div> <br><br>
      Hello, dear friend<strong> ${data.name}</strong>!<br>
      Your login - ${data.login}, <br> id - ${data._id}.<br>
      <button class="btn btn-small" data-event="change" data-user="${data._id}">Change</button>
      <button class="btn btn-small" data-event="delete" data-user="${data._id}">Delete</button>
      </div>`
  });
    
    return wrapper;
}