function showPassword(e) {
    const togglePassword = e.target;
    const eyes = togglePassword.closest('#togglePassword');
    if(eyes) {
        const passwordInput = togglePassword.previousElementSibling;
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);

        togglePassword.classList.toggle("show");

        setTimeout(() => {
            const type = passwordInput.getAttribute("type") === "text" ? "password" : "password";
            passwordInput.setAttribute("type", type);

            togglePassword.classList.toggle("show");
        }, 2000);
    }
}

export default showPassword;