const Rooms = new Mongo.Collection('rooms')

Meteor.methods({
	insertRoom(data) {
		if(!this.userId)
			throw new Meteor.Error('unauthorized')

		let room = {
			name:data.name,
			createdBy:this.userId,
			createdAt:Date.now()
		}

		Rooms.insert()
	},

	removeRoom(id) {
		if(!this.userId)
			throw new Meteor.Error('unauthorized')

		if(!id)
			throw new Meteor.Error('invalid id')

		let myRoomSelector = {
			_id:id,
			createdBy:this.userId
		}

		Rooms.remove(myRoomSelector)
	}
})

export default Rooms