Meteor.publish("room.users", function(ids){
	if (!ids)
		return this.ready()
	return Meteor.users.find({_id: {$in: ids}})
})