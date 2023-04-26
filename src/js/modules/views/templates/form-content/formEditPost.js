export function editPostContent(post) {
    
    return `
    <div class="form-foto form-input"> 
        <div class="form-foto_title">Upload new photo for post<br><span>(.jpg, .phg, .webp)</span></div>
        <div class="form-foto_post">
            <img src="${post.imageSrc}"/>
        </div>
        <input type="file" name="foto" accept=".jpg, .jpeg, .png" data-validate="maxSizeNotSure">
        <div class="form-foto_text">Upload photo. Drag and drop a file into this area</div>
        <div class="input-error">Incorrect filing</div>
    </div>
    <div class="form-input">
        <label for="titlePost">Title post:</label>
        <textarea name="titlePost" placeholder="Enter post title...">${post.titlePost}</textarea>
        <div class="input-error">Incorrect filing</div>
    </div>
    <div class="form-input">
        <label for="descriptionPost">Content post:</label>
        <textarea name="descriptionPost" placeholder="Content post..." class="big">${post.descriptionPost}</textarea>
        <div class="input-error">Incorrect filing</div>
    </div>
    `;
}