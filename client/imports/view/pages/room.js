import './room.html'
import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/kadira:flow-router'
import Rooms from '/common/imports/collections/rooms.js'
//import { Template } from 'meteor/blaze-html-templates' <- DOESN'T WORK...
import '../components/loading.js'

Template.room.onCreated(function() {
	this.state = new ReactiveDict()

	this.state.set('name',FlowRouter.getParam('name'))

	this.subscribe('room', this.state.get('name'))

	this.autorun(()=> {
		const room = Rooms.findOne()

		if(room && room.users && room.users.length)
			this.subscribe("room.users", room.users)
	})
})

Template.room.helpers({
	room() {
		return Rooms.findOne({name:Template.instance().state.get('name')})
	},
	users() {
		return Meteor.users.find()
	}
})
