export function elementCreate(params) {
    const element = document.createElement(params.elem);
    const classes = params.class.split(', ');
    classes.forEach(item => {
        element.classList.add(item);
    });
    element.textContent = params.text;
    if (params.id) {
        element.id = params.id;
    }
    if (params.content) {
        element.innerHTML = params.content;
    }
    if (params.att && params.attName) {
        element.setAttribute(params.attName, params.att);
    }
    return element;
}
