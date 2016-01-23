import Rooms from '/common/imports/collections/rooms'

Template.room.onCreated(function() {
	this.state = new ReactiveDict()

	this.state.set('name',FlowRouter.getParam('name'))

	Meteor.subscribe('room', this.state.get('name'))
})

Template.room.helpers({
	room() {
		return Rooms.findOne({name:Template.instance().state.get('name')})
	}
})