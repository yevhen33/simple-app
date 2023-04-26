import {DataService} from "./modules/services/dataService";
import {locationHandler} from "./modules/router/router";
import {exitBtn} from "./modules/services/form-service/auth/exitBtn";

window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    
    if(!DataService.currentUser()) {
        window.location.hash = "#login";   
    } else {
        exitBtn();
    }
    window.addEventListener("hashchange", locationHandler);
    locationHandler();
    
});
