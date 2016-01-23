import Rooms from '/common/imports/collections/rooms'

Meteor.publish('rooms', function() {
	return Rooms.find()
})

Meteor.publish('room', function(name) {
	if(!name)
		return this.ready()

	return Rooms.find({name})
})