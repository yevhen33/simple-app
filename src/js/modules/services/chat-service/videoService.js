export const VideoService = {
    addVideoStream: (parent, video, stream) => {
        video.srcObject = stream ;
        video.addEventListener('loadedmetadata', () => { 
            video.play();
        });
        parent.append(video);
    },
    connectToNewUser: (parent, peers, myPeer, userId, stream) => { 
        const call = myPeer.call(userId, stream); 
        
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            VideoService.addVideoStream(parent, video, userVideoStream);
        });
        
        call.on('close', () => {
            video.remove();
        });
    
        peers[userId] = call;
    }
};