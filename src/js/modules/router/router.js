import { routes } from "./routs";

export const locationHandler = async () => {
    let location = window.location.hash.replace("#", "").split(":").shift();
    const params = window.location.hash.split(":").pop();
    if(location.length === 0) {
        location = "/";
    }

    const route = routes[location] || routes[404];

    document.getElementById('root').innerHTML = "";
    
    document.getElementById('root').append(route.accessCheck() ? await route.template.render(params) : routes[404].template.render(params));
    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute("content", route.description);

};

window.addEventListener("hashchange", locationHandler);
