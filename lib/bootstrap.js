
Meteor.startup(function() {
	if(Rooms.find().count() === 0) {
		var rooms = [
			{name: "Q&A"},
			{name: "room2"},
			{name: "room3"}
		];

		for (var i = rooms.length - 1; i >= 0; i--) {
			Rooms.insert(rooms[i]);
		};
	}
});