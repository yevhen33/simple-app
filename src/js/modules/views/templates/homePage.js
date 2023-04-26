import { elementCreate } from "../../helper/utils/elementCreate";

export function homePage(data) {
    
    const img = data.foto ? data.foto : `./img/not-foto.png`;

    const wrapper = elementCreate({
        elem: "div",
        class: "us",
        content: `
        <h1>Hi ${data.name}!</h1> <br>
        <div class="user-img"><img src="${img}" alt="foto user"></div> <br><br>
        <h3>You got to your page in the app.</h3>`
    });
    
    return wrapper;
}