import Rooms from '/common/imports/collections/rooms'

Template.rooms.onCreated(function() {
	this.state = new ReactiveDict()

	Meteor.subscribe('rooms')
})

Template.rooms.helpers({
	rooms() {
		return Rooms.find()
	}
})