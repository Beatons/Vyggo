Template.room.onCreated(function(){
	this.id = FlowRouter.getParam("id")
	this.subscribe("rooms.room", this.id)
})

Template.room.onRendered(function(){
	
})

Template.room.onDestroyed(function(){
	
})

Template.room.events({

})

Template.room.helpers({
	id(){
		return Template.instance().id
	},
	room(){
		return Rooms.findOne(Template.instance().id)
	}
})