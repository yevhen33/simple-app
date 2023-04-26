import { errorPage } from "../../templates/errorPage";

export class Base {
    constructor(template) {
        this.template = template;
    }

    render() {
        return this.template();
    }
}

export const error = new Base(errorPage);