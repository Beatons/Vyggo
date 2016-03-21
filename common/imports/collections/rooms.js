import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'

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
			users:[],
			components:[]
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

	getReasonUnavailable(name) {

		const room = Rooms.findOne({name})

		return room ? room.threshold>room.users.length ? undefined  : 'Room Full' : 'Room Not Found'
	},

	addComponent(roomId) {
		throwOnserver(!this.userId, 'unauthorized')
		throwOnserver(!roomId, 'invalid id')

		const component = {
			_id: Random.id(),
			x: 0,
			y: 0,
			createdAt: Date.now(),
			createdBy: this.userId
		}

		Rooms.update({_id: roomId, createdBy: this.userId}, { $push: { components: component}})
	},

	removeComponent(roomId, componentId) {
		throwOnserver(!this.userId, 'unauthorized')
		throwOnserver(!roomId, 'invalid roomId')
		throwOnserver(!componentId, 'invalid componentId')

		Rooms.update({_id: roomId, createdBy: this.userId}, {$pull:{ components:{_id: componentId}}})
	},

	moveComponent(roomId, componentId, x, y) {
		throwOnserver(!this.userId, 'unauthorized')
		throwOnserver(!roomId, 'invalid roomId')
		throwOnserver(!componentId, 'invalid componentId')

		Rooms.update({
			_id: roomId, 
			createdBy: this.userId, 
			'components._id': componentId
			}, {
			$set: {
				'components.$.x':x,
				'components.$.y':y
			}
		})
	}
})
