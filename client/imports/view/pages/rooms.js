import './rooms.html'

import Rooms from '/common/imports/collections/rooms.js'

Template.rooms.onCreated(function() {
	this.state = new ReactiveDict()

	Meteor.subscribe('rooms')
})

Template.rooms.helpers({
	rooms() {
		return Rooms.find()
	},

	anyRooms() {
		return Rooms.find().count()
	}
})