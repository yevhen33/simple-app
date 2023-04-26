import { elementCreate } from "../../../helper/utils/elementCreate";
export class BaseComment {
    constructor(comment) {
        this.comment = comment;
    }
    render() {
        const wrapper = elementCreate({
            elem: "div", 
            class: "comment-elem", 
            content: `<div class="comment-elem_user">
                <div class="comment-elem_user_img"><img src="${this.comment.author.foto}"></div>
                <div class="comment-elem_user_name">${this.comment.author.name}</div>
                </div>
                <div class="comment-elem_text">${this.comment.content}</div>`
            });

        return wrapper;
    }
}