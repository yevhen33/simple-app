import { BaseComment } from "../../models/pages/baseComment";
import { elementCreate } from "../../../helper/utils/elementCreate";
import { commentReplyBottom } from "./commentReplyBottom";
import { CommentService } from "../../../services/commentService";

export class CommentReplyView extends BaseComment {
    constructor(comment, userID, Data, userName) {
        super(comment);
        this.user = userID;
        this.Data = Data;
        this.userName = userName;
    }

    async commentDelete(parent) {
        const delet = elementCreate({
            elem: "div",
            class: "comment-reply_delete",
            content: `<img src="./img/comment-delete.svg" alt="delete comment">`});

        delet.addEventListener('click', async () => {
            await CommentService.deleteComment(this.comment);
            parent.remove();
        });

        parent.append(delet);
    }

    async bottomTemplate(parent) {
        const bottom = await commentReplyBottom(this.comment, this.user);
        parent.append(bottom);
    }
    
    async render() {
        const wrapper = elementCreate({
            elem: "div", 
            class: "comment-reply", 
            content: `<div class="comment-reply_content"><div class="comment-reply_user">
                <div class="comment-reply_user_img"><img src="${this.comment.author.foto}"></div>
                <div class="comment-reply_user_name">${this.comment.author.name}</div>
                </div>
                <div class="comment-reply_text"><span>@${this.userName}</span> ${this.comment.content}</div></div>`
            });
    
        if(this.comment.author._id === this.user) {

            this.commentDelete(wrapper);
        }
    
        this.bottomTemplate(wrapper);
    
        return wrapper;
    }
}