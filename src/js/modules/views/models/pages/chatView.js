import { Base } from "./baseView";
import { DataService } from "../../../services/dataService";
import { chatFormView } from "../../templates/chat-template/chatForm";
import { elementCreate } from "../../../helper/utils/elementCreate";
import {SocketService} from "../../../services/chat-service/socketService";
import { VideoService } from "../../../services/chat-service/videoService";
import { io } from "socket.io-client";
import { Peer } from "peerjs";

class ChatView extends Base {
    constructor(template, Data, Socket, Video) {
        super(template);
        this.Data = Data;
        this.Socket = Socket;
        this.Video = Video;
    }

    videoChat(parent, socket) {
        const myPeer = new Peer(); 
        const peers = {};

        const myVideo = document.createElement('video'); 
        myVideo.muted = true;

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            this.Video.addVideoStream(parent, myVideo, stream); 
            myPeer.on('call', call => { 
                call.answer(stream); 
                const video = document.createElement('video'); 
                call.on('stream', userVideoStream => { 
                    this.Video.addVideoStream(parent, video, userVideoStream); 
                });
            });

            this.Socket.connectNewStream(parent, peers, myPeer, stream, socket);

        }).catch(() => {
            const myVideo = elementCreate({elem: 'div', class: "video-id", text: "Sorry, video doesn't work"});
            parent.append(myVideo);
        });

        this.Socket.disconnectStream(peers, socket);

        myPeer.on('open', userId => { 
            socket.emit('join-room', '0909', userId);
        });

    }

    async render() {
        document.getElementById('root').classList.add('chats');
        document.querySelector('header').classList.add('active');

        const wrapper = elementCreate({elem: "div", class: "wrapper"});

        const nameUser = this.Data.getCurrent().name;
        const user = this.Data.getCurrent()._id;

        const socket = io();

        this.Socket.connect(user, nameUser, socket);

        const wrapperVideo = elementCreate({elem: "div", class: "video"});
        this.videoChat(wrapperVideo, socket);

        const wrapperChat = elementCreate({elem: "div", class: "chat"});
        const connect = elementCreate({elem: "div", class: "chat-connect"});
        this.Socket.connectUsers(connect, socket);
        wrapperChat.append(connect);

        const newUserConnect = elementCreate({elem: "div", class: "chat-new"});
        this.Socket.connectNewUser(newUserConnect, socket);
        wrapperChat.append(newUserConnect);

        const container = elementCreate({elem: "div", class: "chat-container"});
        this.Socket.chatMessage(container, user, socket);
        wrapperChat.append(container);

        const formWrapper = elementCreate({elem: "div", class: "chat-form"});
        const name = elementCreate({elem: "div", class: "chat-form_name", text: nameUser});

        const form = this.template(user);

        formWrapper.append(name);
        formWrapper.append(form);

        wrapperChat.append(formWrapper);
        
        wrapper.append(wrapperVideo);
        wrapper.append(wrapperChat);

        return wrapper;
    }
}

export const chatPage = new ChatView(chatFormView, DataService, SocketService, VideoService);