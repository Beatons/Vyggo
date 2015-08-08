WebRTC = (function() {

	//== LOCAL ==//
	var 
	webrtc = this.webrtc = new SimpleWebRTC({
		localVideoEl: 'localVideo',
		remoteVideosEl: '',
		autoRequestMedia: true,
		media:{
			audio: false,
			video: false
		},
		localVideo: {
			autoplay: true,
			mirror: false,
			muted: true
		},
		nick: "Annonymous"
	}),

	inRoom = false,
	isAnnonymous = true,

	videoFrameClass = undefined,
	videoFrameContainer = undefined,

	textFrameClass = undefined,
	textFrameContainer = undefined
	;

	//== WebRTC EVENTS ==//
	webrtc.on('videoAdded', function(video, peer) {
		configureVideo(video);
		EmbedElement(
			video, 
			document.createElement('div'), 
			videoFrameClass, 
			peer.id, 
			videoFrameContainer
		);
	});
	webrtc.on('videoRemoved', function(video, peer) {
		var frame = document.getElementById(peer.id);
		if(frame!==undefined)frame.remove();
	});

	webrtc.connection.on('message', function(data) {
		if(data.type==='peer-text') {
			EmbedElement(
				data.payload,
				document.createElement('div'),
				textFrameClass,
				peer.id,
				textFrameContainer
			);
		}
	});

	webrtc.on('readyToCall', function() {
		//might get useful at some point...
	});

	//== LOCAL UTILITY METHODS ==//
	var configureVideo = function(video) {
		video.contextMenu = function() { return false; };
		video.controls = 'controls';
	};

	var EmbedElement = function(element, frame, frameClass, frameId, container) {
		container.appendChild(frame);
		frame.className = frameClass;
		frame.id = frameId;
		frame.appendChild(element);
	}

	//== EXPORT ==//
	return {

		name: function(newName) {
			if(newName!==undefined && typeof newName ==='string' && newName.length>0) {
				webrtc.nick = newName;
				if(isAnnonymous)isAnnonymous=false;
			}
			return webrtc.nick;
		},

		isAnnonymous: function() {
			return isAnnonymous;
			//
		},

		leave: function() {
			if(inRoom) {
				webrtc.stopLocalVideo();
				webrtc.leaveRoom();
				textFrameClass = undefined;
				textFrameContainer = undefined;
				videoFrameClass = undefined;
				videoFrameContainer = undefined;
				inRoom=false;
			}
			else {
				console.log('failed to leave room. Already in room!');
			}
		},

		join: function(room, videoClass, videoContainer, textClass, textContainer) {
			if(!inRoom && room!==undefined && typeof room==='string' && room.length>0) {
				if (webrtc.localStream && webrtc.sessionReady) {
					textFrameClass = textClass;
					textFrameContainer = textContainer;
					videoFrameClass = videoClass;
					videoFrameContainer = videoContainer;
					webrtc.joinRoom(room);
					inRoom = true;
				}
				else {
					console.log('failed to join room. Not ready!');
				}
			}
			else {
				console.log('failed to join room. Invalid params!');
			}
		},

		message: function(text) {
			webrtc.sendToAll('peer-text', text);
			EmbedElement(
				text,
				document.createElement('div'),
				textFrameClass,
				webrtc.connection.socket.sessionid,
				textFrameContainer
			);
		}
	};
})();