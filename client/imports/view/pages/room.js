import './room.html'
import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/kadira:flow-router'
import Rooms from '/common/imports/collections/rooms.js'
//import { Template } from 'meteor/blaze-html-templates' <- DOESN'T WORK...
import '../components/banner.js'
import './room/room_users.js'
import './room/room_controls.js'

Template.room.onCreated(function() {
	this.state = new ReactiveDict()

	this.autorun(() => {
		FlowRouter.watchPathChange()
		this.state.set('name',FlowRouter.getParam('name'))
		this.subscribe('room', this.state.get('name'))
	})

	this.autorun(()=> {
		const room = Rooms.findOne()

		if(!room)
			Meteor.call('getReason', this.state.get('name'), (error, reason) => {
				error ? console.log(error) : this.state.set('reason', reason)
			})
		else
			this.state.set('reason', undefined)

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
	},

	reason() {
		return Template.instance().state.get('reason')
	},

	room_users_data() {
		const 	room = Rooms.findOne({}, {fields:{threshold:1, users:1}}),
				usernames = Meteor.users.find().fetch().map(user => user.username)

		if(!room || !usernames)
			return {usernames:[], threshold:'?', userCount:'?'}

		return { usernames, threshold:room.threshold, userCount:room.users.length }
	}
})
