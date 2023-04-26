import { elementCreate } from "../../helper/utils/elementCreate";
import { VideoService } from "./videoService";

export const SocketService = {
    connect: (id, name, socket) => {
        socket.on('connect', () => {
            socket.emit('connectUser', {userId: id, name: name});
        });
    },
    connectUsers: (parent, socket) => {
        socket.on('updateUsers', (data) => {
            parent.innerHTML = '';
            parent.innerHTML = `Now ${data} users connected!`;
        });
    },
    connectNewUser: (parent, socket) => {
        socket.on('newUserConnect', data => {
            parent.innerHTML = data.descr;
            parent.style.opacity = 1;
            setTimeout(() => {
                parent.style.opacity = 0;
            }, 5000);
        });
    },
    chatMessage: (parent, ID, socket) => {
        socket.on('chat message', (data) => {
            const message = elementCreate({
                elem: "div",
                class: `${data.userId === ID ? "chat-message, author" : "chat-message"}`,
                content: `<span class="chat-message_name">${data.name}</span>
                <span class="chat-message_text">${data.message}</span>`
            });
            parent.append(message);
            parent.scrollTo(0, parent.scrollHeight);
        });
    },
    connectNewStream: (parent, peers, myPeer, stream, socket) => {
        socket.on('user-connected', userId => { 
            setTimeout(() => {
                VideoService.connectToNewUser(parent, peers, myPeer, userId, stream);
              }, 1000); 
        });
    },
    disconnectStream: (peers, socket) => {
        socket.on('user-disconnected', userId => {
            if (peers[userId]) {
                peers[userId].close();
            }
        });
    }
};