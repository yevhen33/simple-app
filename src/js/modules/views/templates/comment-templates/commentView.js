import { BaseComment } from "../../models/pages/baseComment";
import { elementCreate } from "../../../helper/utils/elementCreate";
import { commentChangeView } from "./commentChange";
import { commentBottom } from "./commentBottom";
import { CommentReplyView } from "./commentReplyView";


export class CommentView extends BaseComment {
    constructor(comment, Data, replys) {
        super(comment);
        this.Data = Data;
        this.replys = replys;
        this.user = this.Data.getCurrent()._id;
    }

    async editTemplate(parent) {
        const change = commentChangeView(this.comment, this.user, ".comment-elem", ".comment-edit");
        parent.append(change);
    }

    async bottomTemplate(parent) {
        const bottom = await commentBottom(this.comment, this.user, ".comment-elem");
        parent.append(bottom);
    }

    async reply(parent, replys) {
        const replyBlock = elementCreate({elem: "div", class: "comment-elem_reply"});
        
        if (replys.length) {
            replys.forEach(async (item)  => {
                const reply = await new CommentReplyView(item, this.user, this.Data, this.comment.author.name).render();
                replyBlock.append(reply);
            });
        }

        parent.append(replyBlock);
    }

    async render() {
        const wrapper = elementCreate({
            elem: "div", 
            class: "comment-elem", 
            content: `<div class="comment-elem_user">
                <div class="comment-elem_user_img"><img src="${this.comment.author.foto}"></div>
                <div class="comment-elem_user_name">${this.comment.author.name}</div>
                </div>
                <div class="comment-elem_text">${this.comment.content}</div>`
            });
    
        const form = elementCreate({elem: "div", class: "comment-edit"});
        wrapper.append(form);
        
        this.editTemplate(wrapper);
            
        this.bottomTemplate(wrapper);

        this.reply(wrapper, this.replys);
    
        return wrapper;
    }
}