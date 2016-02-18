import './rooms.html'
//import { Template } from 'meteor/blaze-html-templates' <- DOESN'T WORK...
import { ReactiveDict } from 'meteor/reactive-dict'
import Rooms from '/common/imports/collections/rooms.js'

Template.rooms.onCreated(function() {
	this.state = new ReactiveDict()

	this.subscribe('rooms')
})

Template.rooms.helpers({
	rooms() {
		return Rooms.find()
	},

	anyRooms() {
		return Rooms.find().count()
	}
})