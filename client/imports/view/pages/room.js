import './room.html'
import './room.css'
import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/kadira:flow-router'
import Rooms from '/common/imports/collections/rooms.js'
//import { Template } from 'meteor/blaze-html-templates' <- DOESN'T WORK...
import '../components/banner.js'
import './room/room_users.js'
import './room/room_controls.js'
import './room/room_component.js'

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
			Meteor.call('getReasonUnavailable', this.state.get('name'), (error, reason) => {
				error ? console.log(error) : this.state.set('reasonUnavailable', reason)
			})
		else
		{
			this.state.set('reason', undefined)
			this.state.set('roomId', room._id)
		}

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

	reasonUnavailable() {
		return Template.instance().state.get('reasonUnavailable')
	},

	room_users_data() {
		const 	room = Rooms.findOne({}, {fields:{threshold:1, users:1}}),
				usernames = Meteor.users.find().fetch().map(user => user.username)

		if(!room || !usernames)
			return {usernames:[], threshold:'?', userCount:'?'}

		return { usernames, threshold:room.threshold, userCount:room.users.length }
	},

	room_controls_data() {
		return { roomId: Template.instance().state.get('roomId')}
	},

	room_components_data() {

		const room = Rooms.findOne({name:Template.instance().state.get('name')})

		if(!room || !room.components.length)
			return []

		room.components.forEach(component => component.roomId = room._id)

		return room.components
	}
})
