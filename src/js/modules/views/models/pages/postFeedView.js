import { Base } from "./baseView";
import { DataService } from "../../../services/dataService";
import { FiltersPost } from "../../../services/post-service/filterPosts";
import {feedPosts} from "../../templates/feedPostsPage";
import {elementCreate} from "../../../helper/utils/elementCreate";
import {PostService} from "../../../services/post-service/postService";
import {paginationView} from "../../templates/paginationView";


class FeedView extends Base {
    constructor(template, Data, Services, paginationView) {
        super(template);
        this.Data = Data;
        this.Services = Services;
        this.paginationView = paginationView;
        this.limits = [1, 3, 5];
        this.paginationLimit = this.Data.getPaginationLimit() ? this.Data.getPaginationLimit() : 1;
    }

    postEvents() {
        addEventListener('click', (e) => {
            const eventBtn = e.target.dataset.event;
            const post = e.target.dataset.post;
            switch (eventBtn) {
                case "post-edit":
                    window.location.hash = `#editpost:${post}`;
                    break;
                case "post-delete":
                    this.Services.postDelete(post);
                    e.target.closest('.feed-post').remove(); 
                    break;
                default:
                    return;
            }
        });
    }

    async pagination(parent, paginBlock) {
        parent.innerHTML = "";

        let currentPage = this.Data.getCurrentPagePosts();
            if(!currentPage) {
                currentPage = 1;
                this.Data.installCurrentPagePosts(currentPage);
            }
        let filter = this.Data.getFilterPosts();
            if(!filter) {
                filter = "newPosts";
                this.Data.installFilterPosts(filter);
            }
            
        const pages = await FiltersPost.counterPosts(filter);
        
        const paginPosts = await FiltersPost.filterData(filter, currentPage, this.paginationLimit);
        
        paginPosts.forEach(async (post) => {
            let elem = await this.template(post, this.Data, this.Services);
            parent.append(elem);
        });
        this.paginationList(paginBlock, pages, this.paginationLimit, parent);
    }

    paginationList(parent, pages, limit, postsWrapper) {
        parent.innerHTML = "";
        if (pages <= limit) {return;}
        const pagesCount = Math.ceil(pages / limit);

        const wrapper = this.paginationView(this.Data, pagesCount, 5);

        wrapper.querySelectorAll(".pagination-item.btn").forEach(item => {
            item.addEventListener("click", () => {
                this.pagination(postsWrapper, parent, pages);
            });
        });

        parent.append(wrapper);
    }
    async paginUI(parent, wrapperPosts, paginationBlock) {
        parent.innerHTML = "";
        this.limits.forEach(item => {
            let element = elementCreate({
                elem: "div", 
                class: item === this.paginationLimit ? "btn, btn-limit, active" : "btn, btn-limit", 
                text: item
            });
            element.addEventListener('click', () => {
                this.paginationLimit = item;
                this.Data.installPaginationLimit(item);
                this.paginUI(parent, wrapperPosts, paginationBlock);
                this.pagination(wrapperPosts, paginationBlock);
            });
            parent.append(element);
        });
    }
    async render() {
        document.getElementById('root').classList.add('main');
        document.querySelector('header').classList.add('active');

        const wrapper = elementCreate({elem: "div", class: "feed"});
        const feed = elementCreate({elem: "div", class: "feed-content"});
        const title = elementCreate({elem: "h1", class: "feed-title", text: "Feed all posts"});
        feed.append(title);
        const wrapperPosts = elementCreate({elem: "div", class: "feed-wrapper"});
        feed.append(wrapperPosts);
        const paginationBlock = elementCreate({elem: "div", class: "pagination"});
        feed.append(paginationBlock);

        const filter = elementCreate({elem: "div", class: "feed-filter"});
        filter.innerHTML = `
        <a href="/#post" class="btn btn_link">New Post</a>`;

        const filtersBlock = elementCreate({elem: "div", class: "feed-filters", content: "<h2>Filters</h2>"});
        filter.append(filtersBlock);

        const paginLimit = elementCreate({elem: "div", class: "pagination-filter", content: "<span>Limit posts</span>"});
        const paginBtnLimit = elementCreate({elem: "div", class: "pagination-filter_content"});
        paginLimit.append(paginBtnLimit);
        this.paginUI(paginBtnLimit, wrapperPosts, paginationBlock);
        filtersBlock.append(paginLimit);

        const filterNew = elementCreate({elem: "div", class: "btn, btn-filter", text: "New Top"});
        filtersBlock.append(filterNew);

        const filterOld = elementCreate({elem: "div", class: "btn, btn-filter", text: "Old Top"});
        filtersBlock.append(filterOld);

        const filterMy = elementCreate({elem: "div", class: "btn, btn-filter", text: "My Posts"});
        filtersBlock.append(filterMy);

        wrapper.append(feed);
        wrapper.append(filter);

        this.pagination(wrapperPosts, paginationBlock);

        filterMy.addEventListener('click', async () => {
            FiltersPost.titleFilter(title, "Only my posts", "myPosts");
            this.pagination(wrapperPosts, paginationBlock);
        });

        filterOld.addEventListener('click', async () => {
            FiltersPost.titleFilter(title, "Feed all posts", "oldPosts");
            this.pagination(wrapperPosts, paginationBlock);
        });

        filterNew.addEventListener('click', async () => {
            FiltersPost.titleFilter(title, "New posts above", "newPosts");
            this.pagination(wrapperPosts, paginationBlock);
        });

        this.postEvents();

        return wrapper;
    }
}

export const postFeed = new FeedView(feedPosts, DataService, PostService, paginationView);