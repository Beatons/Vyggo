Meteor.publish('room', function(name) {
	return Rooms.findOne({ name:name });
});