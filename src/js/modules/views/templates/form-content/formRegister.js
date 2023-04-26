export const registerContent = `
<div class="form-foto">
    <div class="form-foto_title">Upload profile photo<br><span>(.jpg, .phg, .webp)</span></div>
    <div class="form-foto_btn">
        <img src="./img/not-foto.png"/>
    </div>
    <input type="file" name="foto" accept=".jpg, .jpeg, .png">
    <div class="form-foto_text">Photo not selected. Drag and drop a file into this area</div>
</div>
<div class="form-input">
    <label for="login">Login:</label>
    <input type="email" name="login" id="login" placeholder="E-mail*" data-validate="required, email">
    <div class="input-error">Incorrect filing</div>
</div>
<div class="form-input">
    <label for="name">Name:</label>
    <input type="text" name="name" id="name" placeholder="Name*" data-validate="required, min">
    <div class="input-error">Incorrect filing</div>
</div>
<div class="form-input form-input_radio">
    <p class="form-label">Gender:</p>
    <div class="form-radio">
        <input type="radio" name="gender" id="gender-male" value="male">
        <label for="gender-male">Male</label>
    </div>
    <div class="form-radio">
        <input type="radio" name="gender" id="gender-female" value="female">
        <label for="gender-female">Female</label>
    </div>
</div>
<div class="form-input">
    <label for="date">Your birthday:</label>
    <input type="date" name="date" id="date" min="1970-01-01" max="2019-12-31">
</div>
<div class="form-input">
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" placeholder="min 8 characters*" data-validate="required, password">
    <i class="eye" id="togglePassword"><img src="./img/eye.png"/></i>
    <div class="input-error">Incorrect filing</div>
</div>
<div class="form-input">
    <label for="password-repeat">Repeat password:</label>
    <input type="password" placeholder="Confirm password*" data-validate="required, confirm">
    <div class="input-error">Passwords do not match</div>
</div>
`;