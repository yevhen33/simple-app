import { elementCreate } from "../../helper/utils/elementCreate";

export function showLikes($element, parentSelector, likes, titlePopup) {
    if ($element.textContent == 0) {
        return;
    }
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