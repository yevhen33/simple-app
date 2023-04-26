export function formReplyComment(author) {
    return `
        <div class="form-input">
            <textarea name="content" placeholder="Reply @${author}" data-validate="comment"></textarea>
            <div class="input-error">Incorrect filing</div>
        </div>
    `;
}