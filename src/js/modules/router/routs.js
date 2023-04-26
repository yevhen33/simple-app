import { DataService } from "../services/dataService";
import { error } from "../views/models/pages/baseView";
import { indexPage } from "../views/models/pages/userView";
import { currentUserPage } from "../views/models/pages/userView";
import { allPage } from "../views/models/pages/userList";
import { logInPage } from "../views/models/pages/loginView";
import { registerPage } from "../views/models/pages/registerView";
import { userChange } from "../views/models/pages/changeView";
import { postFeed } from "../views/models/pages/postFeedView";
import {userNewPost} from "../views/models/pages/newPostView";
import { editPost } from "../views/models/pages/changeView";
import { commentsFeel } from "../views/models/pages/commentFeelView";
import { photoFilter } from "../views/models/pages/imgFiltersView";
import { chatPage } from "../views/models/pages/chatView";

const pageTitle = "App";

export const routes = {
    404: {
        template: error,
        accessCheck: () => true,
        title: "404 | " + pageTitle,
        description: "404"
    },
    "/": {
        template: indexPage,
        accessCheck: () => !!DataService.currentUser(),
        title: "Home | " + pageTitle,
        description: "Home page"
    },
    current: {
        template: currentUserPage,
        accessCheck: () => !!DataService.currentUser(),
        title: "Current | " + pageTitle,
        description: "Current user Page"
    },
    all: {
        template: allPage,
        accessCheck: () => !!DataService.currentUser(),
        title: "All users | " + pageTitle,
        description: "All users Page"
    },
    login: {
        template: logInPage,
        accessCheck: () => true,
        title: "Log in | " + pageTitle,
        description: "Log in Page"
    },
    register: {
        template: registerPage,
        accessCheck: () => true,
        title: "Register | " + pageTitle,
        description: "Register Page"
    },
    change: {
        template: userChange,
        accessCheck: () => !!DataService.currentUser(),
        title: "Change | " + pageTitle,
        description: "Change Page"
    },
    feed: {
        template: postFeed,
        accessCheck: () => !!DataService.currentUser(),
        title: "Feed | " + pageTitle,
        description: "Post Feed Page"
    },
    post: {
        template: userNewPost,
        accessCheck: () => !!DataService.currentUser(),
        title: "Add Post | " + pageTitle,
        description: "New Post Page"
    },
    editpost: {
        template: editPost,
        accessCheck: () => !!DataService.currentUser(),
        title: "Edit Post | " + pageTitle,
        description: "Edit Post Page"
    },
    comments: {
        template: commentsFeel,
        accessCheck: () => !!DataService.currentUser(),
        title: "Comments Post | " + pageTitle,
        description: "Comments Post Page"
    },
    photofilter: {
        template: photoFilter,
        accessCheck: () => !!DataService.currentUser(),
        title: "Add filter | " + pageTitle,
        description: "Adding filters to photos Page"
    },
    chat: {
        template: chatPage,
        accessCheck: () => !!DataService.currentUser(),
        title: "Online chat | " + pageTitle,
        description: "Online chat with users Page"
    }

};