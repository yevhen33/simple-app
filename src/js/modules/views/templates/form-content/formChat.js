export function formChat() {
    return `
    <div class="form-input form-input_chat">
        <input type="text" name="message" id="message" placeholder="Your message" data-validate="required" autocomplete="off">
        <div class="input-error">Incorrect filing</div>
    </div>`;
}