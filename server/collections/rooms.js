import Rooms from '/common/imports/collections/rooms'

Rooms._ensureIndex({name:1}, {unique:1})

Meteor.publish('rooms', function() {
	return Rooms.find()
})

Meteor.publish('room', function(name) {
	if(!name)
		return this.ready()

	Rooms.update({name, users:{$nin:[this.userId]}}, {$push:{users:this.userId}})

	this.onStop(() => Rooms.update({name}, {$pull:{users:this.userId}}))

	return Rooms.find({name})
})
