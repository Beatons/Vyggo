import Rooms from '/common/imports/collections/rooms'

Rooms._ensureIndex({name:1}, {unique:1})

Meteor.publish('rooms', function() {
	return Rooms.find()
})

Meteor.publish('room', function(name) {
	if(!name)
		return this.ready()


	if(this.userId) {
		Rooms.update({name, users:{$nin:[this.userId]}}, {$push:{users:this.userId}})
		this.onStop(() => Rooms.update({name}, {$pull:{users:this.userId}}))
	}
	else {
		Rooms.update({name}, {$inc:{viewerCount:1}})
		this.onStop(() => Rooms.update({name}, {$inc:{viewerCount:-1}}))
	}

	return Rooms.find({name})
})
