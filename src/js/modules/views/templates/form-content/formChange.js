export function changeContent(user) {

    const img = user.foto ? user.foto : `./img/not-foto.png`;
    
    return `
    <div class="form-foto"> 
        <div class="form-foto_title">Upload profile photo<br><span>(.jpg, .phg, .webp)</span></div>
        <div class="form-foto_btn">
            <img src="${img}"/>
        </div>
        <input type="file" name="foto" accept=".jpg, .jpeg, .png">
        <div class="form-foto_text">Change photo. Drag and drop a file into this area</div>
    </div>
    <div class="form-input">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" placeholder="Name" data-validate="required, min" value="${user.name}">
        <div class="input-error">Incorrect filing</div>
    </div>
    <div class="form-input">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" placeholder="Password" data-validate="required, password" value="${user.password}">
        <i class="eye" id="togglePassword"><img src="./img/eye.png"/></i>
        <div class="input-error">Incorrect filing</div>
    </div>
    <div class="form-input">
        <label for="password-repeat">Repeat password:</label>
        <input type="password" id="confirm" placeholder="Confirm password*" data-validate="required, confirm" value="${user.password}">
        <div class="input-error">Incorrect filing</div>
    </div>
    `;
}