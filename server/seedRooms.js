Meteor.startup(function() {
	Rooms.remove({});
	var rooms = [
	{name: "questions"},
	{name: "gaming"},
	{name: "philosophy"}
	];
	for (var i = rooms.length - 1; i >= 0; i--) {
		Rooms.insert(rooms[i]);
	};
});