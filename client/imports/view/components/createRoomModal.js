import './createRoomModal.html'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
//import { Template } from 'meteor/blaze-html-templates' <- DOESN'T WORK...

Template.createRoomModal.events({
	'submit #create-room-form'(e, t) {
		e.preventDefault()

		let name 		= e.target.name,
			threshold 	= e.target.threshold

		Meteor.call('insertRoom', {name:name.value, threshold:threshold.value}, error => {
			Session.set('createRoomModal', error ? {content: error.error} : undefined)
			if(error)
				return

			$('#create-room-modal').modal('hide')

			FlowRouter.go('room', {name:name.value})

			name.value 			= ''
			threshold.value = ''
		})
	}
})
