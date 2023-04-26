export function postContent() {
    return `
    <div class="form-foto form-input"> 
        <div class="form-foto_title">Upload photo for post<br><span>(.jpg, .phg, .webp)</span></div>
        <div class="form-foto_post">
            <img src="./img/no-photo.png"/>
        </div>
        <input type="file" name="foto" accept=".jpg, .jpeg, .png" data-validate="maxSize">
        <div class="form-foto_text">Upload photo. Drag and drop a file into this area</div>
        <div class="input-error">Incorrect filing</div>
    </div>
    <div class="form-input">
        <label for="titlePost">Title post:</label>
        <textarea name="titlePost" placeholder="Enter post title..."></textarea>
        <div class="input-error">Incorrect filing</div>
    </div>
    <div class="form-input">
        <label for="descriptionPost">Content post:</label>
        <textarea name="descriptionPost" placeholder="Content post..." class="big"></textarea>
        <div class="input-error">Incorrect filing</div>
    </div>
    `;
}