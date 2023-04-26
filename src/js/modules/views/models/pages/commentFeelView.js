import { Base } from "./baseView";
import { DataService } from "../../../services/dataService";
import { elementCreate } from "../../../helper/utils/elementCreate";
import {commentTitleView} from "../../templates/comment-templates/commentTitleView";
import {commentFormView} from "../../templates/comment-templates/commentFormView";
import {CommentView} from "../../templates/comment-templates/commentView";


class CommentFeelView extends Base {
    constructor(template, Data, titleTemplate, formTemplate) {
        super(template);
        this.Data = Data;
        this.Title = titleTemplate;
        this.Form = formTemplate;
    }

    async render(params) {
        document.getElementById('root').classList.add('main');
        document.querySelector('header').classList.remove('active');

        const wrapper = elementCreate({elem: "div", class: "comment"});
        const title = await this.Title(params, this.Data);
        wrapper.append(title);

        const content = elementCreate({elem: "div", class: "comment-content"});

        let comments = await this.Data.getCommentsPost(params);
        const replys = comments.filter(comment => comment.commentID);
        comments = comments.filter(comment => !comment.commentID);

        comments.forEach(async (item) => {
            const commentReplys = replys.filter(reply => item._id === reply.commentID);
            let comment = await new this.template(item, this.Data, commentReplys).render();
            content.append(comment);
        });

        wrapper.append(content);

        const form = this.Form(params);

        wrapper.append(form);

        return wrapper;
    }
}

export const commentsFeel = new CommentFeelView(CommentView, DataService, commentTitleView, commentFormView);