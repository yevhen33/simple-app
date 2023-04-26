import { DataService } from "../dataService";

export const FiltersPost = {
    titleFilter: (parent, titleText, filter) => {
        localStorage.removeItem('currentPagePosts');
        DataService.installFilterPosts(filter);
        parent.innerHTML = titleText;
    },
    allPosts: async () => {
        return await DataService.getAllPosts(); 
    },
    myPosts: async (page, limit) => {
        const userId = DataService.getCurrent()._id;
        return await DataService.filterPostsId(userId, page, limit);
    },
    newPosts: async (page, limit) => {
        const filter = -1;
        return await DataService.filterDatePosts(page, limit, filter);
    },
    oldPosts: async (page, limit) => {
        const filter = 1;
        return await DataService.filterDatePosts(page, limit, filter);
    },
    sortByName: async () => {
        let POSTS = await DataService.getAllPosts();
        POSTS.sort((a,b) => {
            if (a.user.name < b.user.name) { return -1; }
            else if (a.user.name > b.user.name) { return 1; }
            else { return 0; }
        });
        return POSTS;
    },
    filterData: async (filter, currentPage, paginationLimit) => {
        return await FiltersPost[filter](currentPage, paginationLimit);
    },
    counterPosts: async (filter) => {
        let pages;
        if (filter === "myPosts") {
            pages = await DataService.countMyPosts(DataService.getCurrent()._id);
        } else {
            pages = await DataService.countPosts();
        }
        return pages;
    }
}; 