import { DataService } from "./dataService";
import { elementCreate } from "../helper/utils/elementCreate";
import { PostService } from "./post-service/postService";
import { commentFormEditView } from "../views/templates/comment-templates/commentFormEditView";

export const CommentService = {
    counterLikesComment: async (parent, likes, id) => {
        let element = parent.querySelector('.comment-bottom_like_counter');
        const amount = likes.length;

        if(!amount && !element) {
            return;
        } else if (!amount && element) {
            element.remove();
        } else if (amount && element) {
            element.innerHTML = `Likes: ${amount}`;   
        } else if(amount && !element) {

            element = elementCreate({
                elem: "div", 
                class: "comment-bottom_like_counter", 
                text: `Likes: ${amount}`
            });

            element.addEventListener('click', async () => {
                const commentLikes = await DataService.likesCommentID(id);
                PostService.showLikes(element, ".comment-bottom", commentLikes.likes, "Users like comment");
            });
            parent.append(element);  
        }
    },
    addLikeBlock: async (comment, userID) => {
        let showLike = "not";

        const likeBlock = elementCreate({elem: "div", class: "comment-bottom_like"});
    
        comment.likes.forEach(like => {
            if(like === userID) {
                showLike = "like";
            }
        });
        const like = elementCreate({elem: "div", class: `comment-bottom_like_img, ${showLike}`});
    
        like.addEventListener('click', async () => {
            
            const flag = like.classList.contains('like');
            like.classList.toggle('like');

            const counter = await DataService.updateCommentLikes(comment._id, userID, flag);
    
            await CommentService.counterLikesComment(likeBlock, counter, comment._id);
        });
        likeBlock.append(like);
    
        await CommentService.counterLikesComment(likeBlock, comment.likes, comment._id);
    
        return likeBlock;
    },
    deleteComment: async (comment) => {
        if(!comment.commentID) {
            await DataService.deleteReplyComments(comment._id);
        }
        await DataService.deleteComment(comment._id);
    },
    editContentComment: async (element, id, parentSelector, formSelector, textSelector) => {
        const editBlock = element.closest(parentSelector).querySelector(formSelector);
        const textEdit = element.closest(parentSelector).querySelector(textSelector);
        if(editBlock.classList.contains('active')) {
            editBlock.classList.remove('active');
            editBlock.innerHTML = "";
        } else {
            const comment = await DataService.findCommentID(id);
            const editForm = commentFormEditView(comment);
            editBlock.append(editForm);
            editBlock.classList.add('active');
            editForm.addEventListener('submit', () => {
                const inputValue = editBlock.querySelector('textarea').value;
                textEdit.innerHTML = inputValue;
                editBlock.classList.remove('active');
                editBlock.innerHTML = "";
            });
        }
    }
};