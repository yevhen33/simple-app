export function formEditComment(content) {
    return `
        <div class="form-input">
            <textarea name="content" placeholder="Enter your comment..." data-validate="comment">${content}</textarea>
            <div class="input-error">Incorrect filing</div>
        </div>
    `;
}