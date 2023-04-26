export const loginContent = `
<div class="form-img"><img src="./img/not-foto.png" alt="img"></div>
<div class="form-input">
    <label for="login">Login:</label>
    <input type="email" name="login" id="login" placeholder="E-mail*" data-validate="required, email">
    <div class="input-error">Incorrect filing</div>
</div>
<div class="form-input">
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" placeholder="Password*" data-validate="required, password">
    <i class="eye" id="togglePassword"><img src="./img/eye.png"/></i>
    <div class="input-error">Incorrect filing</div>
</div>
`;