import { Meteor } from 'meteor/meteor'

import Rooms from '/common/imports/collections/rooms'

Rooms._ensureIndex({name:1}, {unique:1})

Meteor.publish('rooms', function() {
	return Rooms.find()
})

Meteor.publish('room', function(name) {
	if(!name)
		return this.ready()

	if(this.userId) {

		

		Rooms.update({name, users:{$nin:[this.userId]}, $where: "this.users.length < this.threshold"}, {$push:{users:this.userId}})
		this.onStop(() => Rooms.update({name, users:{$in:[this.userId]}}, {$pull:{users:this.userId}}))

		return Rooms.find({name, users:{$in:[this.userId]}})
	}
	else 
		return Rooms.find({name})
})

Meteor.startup(() => Rooms.update({users:{$not:{$size:0}}}, {$set:{users:[]}}))
