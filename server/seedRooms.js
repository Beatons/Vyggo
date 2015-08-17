Meteor.startup(function() {
	Rooms.remove({});
	var rooms = [
	{name: "q&a"},
	{name: "leagueoflegends"},
	{name: "marvel"}
	];
	for (var i = rooms.length - 1; i >= 0; i--) {
		Rooms.insert(rooms[i]);
	};
});