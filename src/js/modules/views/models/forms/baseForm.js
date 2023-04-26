import showPassword from '../../../helper/utils/showPassword';
import drop from '../../../helper/utils/dragAndDrop';
import singIn from '../../../services/form-service/handler';

export class BasicForm {
    constructor(options) {
        this.parent = options.parent;
        this.class = options.class;
        this.id = options.id;
        this.title = options.title || "";
        this.bottonText = options.bottonText || "";
        this.changeText = options.changeText || "";
        this.content = options.content;
        this.btn = options.btn;
        this.user = options.user || "";
        this.changeLocation = options.location || '';
    }

    validateForm() {
        addEventListener('submit', singIn);
    }

    showPassword() {
        addEventListener('click', showPassword);
    }

    uploadFoto() {
        addEventListener('click', drop);
    }

    render() {
        this.parent.innerHTML = `
        <form action="#" class="${this.class}" id="${this.id}">
            <div class="form-error">One of the fields contains an error, check the data and try again.</div>
            <div class="form-title">${this.title}<br><span>${this.user}</span></div>
                ${this.content}
            <button class="btn">${this.btn}</button>
            <div class="form-change">${this.bottonText} <a href="${this.changeLocation}"><span id="exit">${this.changeText}</span></a></div>
        </form>
        `;
        return this.parent;
    }
}