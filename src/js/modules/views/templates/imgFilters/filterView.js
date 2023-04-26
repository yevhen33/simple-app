import { elementCreate } from "../../../helper/utils/elementCreate";

export class FilterView {
    constructor(Data, postID, Filters) {
        this.Data = Data;
        this.postID = postID;
        this.Filters = Filters;
    }

    async prevPhoto(parent, url, filter) {
        parent.innerHTML = "";
        const wrapper = elementCreate({
            elem: "div", 
            class: `filter-photo, ${filter ? filter : "hide"}`,
            content: `<img src=${url}>`
        });
        const showFilter = elementCreate({elem: "div", class: `filter-show, ${filter ? filter : "hide"}`});
        const save = elementCreate({
            elem: "div", 
            class: "btn, btn-img", 
            text: "save",
            attName: "data",
            att: filter
        });
        const reset = elementCreate({elem: "div", class: "btn, btn-img", text: "reset"});
        reset.addEventListener('click', () => {
            reset.closest('.filter-show').previousSibling.classList.remove(filter);
            reset.closest('.filter-show').classList.add('hide');
        });
        save.addEventListener('click', async () => {
            const att = save.getAttribute("data");
            this.Data.addFiltersImg(`uploads/${url}`, att);
            window.location.reload();
        });
        showFilter.append(save);
        showFilter.append(reset);
        parent.append(wrapper);
        parent.append(showFilter);
    }

    filtersPhoto(parent, url, filters) {
        const wrapper = elementCreate({
            elem: "div", 
            class: "filter-choice",
            content: `<h3 class="filter-choice_title">Choose your filter</h3>`
        });

        filters.forEach(filter => {
            const element = elementCreate({elem: "div", class: "filter-choice_wrapper"});
            const name = elementCreate({elem: "div", class: "filter-choice_name", text: filter});
            const image = elementCreate({
                elem: "div",
                class: `filter-choice_item, ${filter}`,
                content: `<img src=${url}>`
            });
            image.addEventListener('click', () => {
                this.prevPhoto(parent, url, filter);
            });
            element.append(name);
            element.append(image);
            wrapper.append(element);
        });
        
        return wrapper;

    }

    async render() {
        const wrapper = elementCreate({elem: "div", class: "filter-content"});
        const post = await this.Data.findPostID(this.postID);
        const photoPrev = elementCreate({elem: "div", class: "filter-content_photo"});
        wrapper.append(photoPrev);
        this.prevPhoto(photoPrev, post.imageSrc);
        const filterList = this.filtersPhoto(photoPrev, post.imageSrc, this.Filters);
        wrapper.append(filterList);
        return wrapper;
    }
}