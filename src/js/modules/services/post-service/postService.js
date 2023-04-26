import { DataService } from "../dataService";
import { elementCreate } from "../../helper/utils/elementCreate";

export const PostService = {
    postDelete: async (ID) => {
        const post = await DataService.findPostID(ID);

        DataService.deleteCommentsPost(ID);
        DataService.deleteUserImg(post.imageSrc);
        DataService.deletePost(ID);
    },
    postLike: async (element, counter) => {
        let numberLikes = +counter.textContent;
        const id = element.dataset.post;
        const user = DataService.getCurrent()._id; 
        const post = await DataService.findPostID(id);
        let likes = post.likes;
        if(element.classList.contains('like')) {
            likes = post.likes.filter( item => item != user);
            element.classList.remove('like'); 
            counter.textContent = numberLikes - 1;
        } else {
            likes.push(user);  
            element.classList.add('like'); 
            counter.textContent = numberLikes + 1;
        }
        await DataService.updateLikes(id, JSON.stringify(likes));
    },
    showLikes: async ($element, parentSelector, likes, titlePopup) => {
        if ($element.textContent == 0) {return;}
        const parent = $element.closest(parentSelector);
        const wrapper = elementCreate({elem: "div", class: "feed-popup"});
        const popup = elementCreate({elem: "div", class: "feed-popup_content"});
        const close = elementCreate({elem: "div", class: "feed-popup_close"});
        const title = elementCreate({elem: "h2", class: "feed-popup_title", text: titlePopup});
        popup.append(close);
        popup.append(title);
        wrapper.append(popup);
    
        likes.forEach(like => {
            let user = elementCreate({
                elem: "div", 
                class: "feed-popup_user", 
                content: `<div class="feed-popup_user_img"><img src="${like.foto}" alt="${like.name}"></div>
                <div class="feed-popup_user_name">${like.name}</div>`
            });
            popup.append(user);
        });
    
        close.addEventListener('click', () => {
            wrapper.remove();
        });
        parent.append(wrapper);
    }
};