import { io } from "socket.io-client";
import { DataService } from "../../dataService";

export function chatMessage($form) {
    const socket = io();

    const name = DataService.getCurrent().name;
    const id = $form.querySelector(".form-title span").textContent;
    const $input = $form.querySelector('#message');

    socket.emit('chat message', {
        message: $input.value,
        name: name,
        userId: id
    });

    $input.value = '';

}