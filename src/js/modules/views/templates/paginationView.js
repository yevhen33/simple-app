import { elementCreate } from "../../helper/utils/elementCreate";

export function paginationView(Data, pagesCount, maxPages) {
    const wrapper = elementCreate({elem: "div", class: "pagination-content"});
    const currentPage = Data.getCurrentPagePosts();
    const dots = elementCreate({
        elem: "div",
        class: `pagination-item, btn, dots`,
        text: "..."
    });
    const previous = elementCreate({
        elem: "div",
        class: `pagination-item, ${currentPage === 1 ? "btn, active" : "btn"}`,
        text: "prev"
    });
    previous.addEventListener("click", () => {
        Data.installCurrentPagePosts(currentPage - 1);
    });
    wrapper.append(previous);

    if(pagesCount >= maxPages) {
        for (let i = 0; i < pagesCount; i++) {
            if(currentPage > 2 && currentPage < pagesCount) {
                if(i === 1) {
                    const dots = elementCreate({
                        elem: "div",
                        class: `pagination-item, btn, dots`,
                        text: "..."
                    });
                    wrapper.append(dots);
                } else if (i > 1 && i < (pagesCount - 2) && (i + 1) != currentPage) {
                    continue;
                } else if (i === pagesCount - 2 && (i + 1) != currentPage) {
                    wrapper.append(dots);
                } else {
                    const item = elementCreate({
                        elem: "div",
                        class: `pagination-item, ${currentPage === i + 1 ? "btn, active" : "btn"}`,
                        text: i + 1
                    });
                    item.addEventListener('click', () => {
                        Data.installCurrentPagePosts(i + 1);
                    });
                    wrapper.append(item);
                }
            } else {
                if(i == 2) {
                    wrapper.append(dots);
                }
                else if(i > 2 && i < (pagesCount - 2)) {
                    continue;
                } else {
                    const item = elementCreate({
                        elem: "div",
                        class: `pagination-item, ${currentPage === i + 1 ? "btn, active" : "btn"}`,
                        text: i + 1
                    });
                    item.addEventListener('click', () => {
                        Data.installCurrentPagePosts(i + 1);
                    });
                    wrapper.append(item);
                }
            }
        }
    } else {
        for (let i = 0; i < pagesCount; i++) {
        const item = elementCreate({
            elem: "div",
            class: `pagination-item, ${currentPage === i + 1 ? "btn, active" : "btn"}`,
            text: i + 1
        });
        item.addEventListener('click', () => {
            Data.installCurrentPagePosts(i + 1);
        });
        wrapper.append(item);
    }
    }

    const next = elementCreate({
        elem: "div",
        class: `pagination-item, ${currentPage === pagesCount ? "btn, active" : "btn"}`,
        text: "next"
    });
    next.addEventListener('click', () => {
        Data.installCurrentPagePosts(currentPage + 1);
    });
    wrapper.append(next);

    return wrapper;
}