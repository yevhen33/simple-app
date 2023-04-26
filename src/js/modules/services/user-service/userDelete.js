import { DataService } from "../dataService";

export async function userDelete(e, hash) {
    const deleteBtn = e.target;
    if(deleteBtn.dataset.event === "delete") {
        const id = deleteBtn.dataset.user;
        const userID = await DataService.findUserID(id);
        const posts = await DataService.filterPostsId(userID._id);
        const comments = await DataService.getCommentsUser(userID._id);
        comments.forEach(async (comment) => {
            await DataService.deleteReplyComments(comment._id);
        });
        await DataService.deleteCommentsUser(userID._id);
        posts.forEach(async (post) => {
            await DataService.deleteCommentsPost(post._id);
        });
        await DataService.deletePostsUser(userID._id);
        if(!!userID.foto) {
            DataService.deleteUserImg(userID.foto);
            await DataService.deleteUser(id);
            window.location.hash = hash;
        } else {
            await DataService.deleteUser(id);
            window.location.hash = hash;
        }
        deleteBtn.closest('.user').remove(); 
    }
}