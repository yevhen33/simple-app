export function exitBtn() {
    const exitBtn = document.getElementById("exit-btn");
    exitBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentPagePosts');
        localStorage.removeItem('filterPosts');
        localStorage.removeItem('paginationLimit');
        window.location.hash = "#login"; 
    });
}