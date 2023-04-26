import { Base } from "./baseView";
import { DataService } from "../../../services/dataService";
import { imageFilters } from "../../../helper/variables";
import { elementCreate } from "../../../helper/utils/elementCreate";
import {FilterView} from "../../templates/imgFilters/filterView";

export class ImgFiltersView extends Base {
    constructor(template, Data, Filters) {
        super(template);
        this.Data = Data;
        this.Filters = Filters;
    }

    async render(params) {
        document.getElementById('root').classList.add('main');
        document.querySelector('header').classList.remove('active');

        const wrapper = elementCreate({elem: "div", class: "filter"});
        const title = elementCreate({elem: "h1", class: "filter-title", text: "Add filter to photo"});
        const back = elementCreate({
            elem: "a",
            class: "filter-back",
            attName: "href",
            att: "#feed",
            text: "Back to feed"
        });
        
        wrapper.append(title);
        wrapper.append(back);

        const content = await new this.template(this.Data, params, this.Filters).render();
        wrapper.append(content);
        return wrapper;
    }
}

export const photoFilter = new ImgFiltersView(FilterView, DataService, imageFilters);