Meteor.publish('room', function(roomName) {
	return Rooms.find({ name:roomName });
});

Meteor.publish('subscriptions', function() {
	return Subscriptions.find();
});