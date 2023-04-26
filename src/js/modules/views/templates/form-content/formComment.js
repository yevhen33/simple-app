export function formComment() {
    return `
        <div class="form-input">
            <textarea name="content" placeholder="Enter your comment..." data-validate="comment"></textarea>
            <div class="input-error">Incorrect filing</div>
        </div>
    `;
}