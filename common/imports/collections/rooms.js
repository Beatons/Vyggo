import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export default Rooms = new Mongo.Collection('rooms')

const throwOnserver = function(shouldThrow, errorReason, errorDetails){
	if (shouldThrow)
		if(Meteor.isServer)
			throw new Meteor.Error(errorReason, errorDetails)
		else
			return
}

Meteor.methods({
	insertRoom(data) {
		throwOnserver(!this.userId, 'unauthorized')

		const 	user = Meteor.users.findOne(this.userId),
				roomCount = Rooms.find({createdBy: this.userId}).count()

		throwOnserver(!user || !user.features || user.features.roomAmount <= roomCount, 'Cannot create more rooms.')

		Rooms.insert({
			name:data.name,
			threshold:data.threshold,
			createdBy:this.userId,
			createdAt:Date.now(),
			users:[]
		})
	},

	removeRoom(id) {
		throwOnserver(!this.userId, 'unauthorized')

		throwOnserver(!id, 'invalid id')

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
