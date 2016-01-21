Meteor.publish("rooms.browse", function(){
	return Rooms.find({}, {
		sort:{
			createdBy: -1
		}
	})
})

Meteor.publish("rooms.room", function(id){
	if (!id)
		return this.ready()
	
	return Rooms.find(id)
})

