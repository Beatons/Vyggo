Template.room.onRendered(function() {
	WebRTC.join(
		Rooms.findOne()._id, 
		'videoFrame', 
		document.getElementById('videos'), 
		'textFrame', 
		document.getElementById('messages')
	);
});

Template.room.events({
	'submit #new-message': function(event) {
			event.preventDefault();
			WebRTC.message(event.target.message.value);
			event.target.message.value = '';
		}
});

Template.room.helpers(function() {
	
});

Template.room.events({
	'click #subscribedrooms' : function(event) {
		
	}
});