WebRTC = (function() {

	//== LOCAL ==//
	var 
	webrtc = new SimpleWebRTC({
		localVideoEl: 'localVideo',
		remoteVideosEl: '',
		autoRequestMedia: false,
		media:{
			audio: true,
			video: true
		},
		localVideo: {
			autoplay: true,
			mirror: false,
			muted: true
		},
		nick: "Annonymous"
	}),

	roomId = undefined,
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
			'video-'+peer.id, 
			videoFrameContainer
			);
	});
	webrtc.on('videoRemoved', function(video, peer) {
		var frame = document.getElementById('video-'+peer.id);
		if(frame!==undefined)frame.remove();
	});

	webrtc.connection.on('message', function(data) {
		if(data.type==='peer-text') {
			EmbedElement(
				document.createTextNode(data.payload.message),
				document.createElement('div'),
				textFrameClass,
				data.payload.peerId,
				textFrameContainer
				);
		}
	});

	webrtc.on('readyToCall', function() {
		webrtc.joinRoom(roomId);
	});

	//== LOCAL UTILITY METHODS ==//
	var configureVideo = function(video) {
		video.contextMenu = function() { return false; };
		video.controls = 'controls';
	};

	var EmbedElement = function(element, frame, frameClass, frameId, container) {
		container.insertBefore(frame, container.childNodes[0]);
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
			if(roomId!==undefined) {
				webrtc.stopLocalMedia();
				webrtc.leaveRoom();
				textFrameClass = undefined;
				textFrameContainer = undefined;
				videoFrameClass = undefined;
				videoFrameContainer = undefined;
				roomId=undefined;
			}
			else {
				console.log('failed to leave room. Already in room!');
			}
		},

		join: function(room, videoClass, videoContainer, textClass, textContainer) {
			if(roomId===undefined && room!==undefined && typeof room==='string' && room.length>0) {
				textFrameClass = textClass;
				textFrameContainer = textContainer;
				videoFrameClass = videoClass;
				videoFrameContainer = videoContainer;
				roomId = room;
				webrtc.startLocalVideo();
			}
			else {
				console.log('failed to join room. Invalid params!');
			}
		},

		message: function(text) {
			var peerId = webrtc.connection.getSessionid();
			webrtc.sendToAll('peer-text', { message: text, peerId:peerId });
			EmbedElement(
				document.createTextNode(text),
				document.createElement('div'),
				textFrameClass,
				peerId,
				textFrameContainer
				);
		}
	};
})();