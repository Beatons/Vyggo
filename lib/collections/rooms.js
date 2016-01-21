Rooms = new Mongo.Collection("rooms")

Meteor.methods({
	insertRoom(data){

		/**if (!this.userId)
			throw new Meteor.Error("Unauthorized")**/

		let room = {
			createdBy: this.userId,
			createdAt: Date.now()
			}
		Rooms.insert(room)
	}
})