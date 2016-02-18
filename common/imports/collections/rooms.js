import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export default Rooms = new Mongo.Collection('rooms')

Meteor.methods({
	insertRoom(data) {
		if(!this.userId)
			throw new Meteor.Error('unauthorized')

		Rooms.insert({
			name:data.name,
			threshold:data.threshold,
			createdBy:this.userId,
			createdAt:Date.now(),
			users:[]
		})
	},

	removeRoom(id) {
		if(!this.userId)
			throw new Meteor.Error('unauthorized')

		if(!id)
			throw new Meteor.Error('invalid id')

		Rooms.remove({
			_id:id,
			createdBy:this.userId
		})
	},

	getReason(name) {
		
		const room = Rooms.findOne({name})

		return room ? room.threshold>room.users.length ? undefined  : 'Room Full' : 'Room Not Found'
	}
})