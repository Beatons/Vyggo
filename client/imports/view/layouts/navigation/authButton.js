import './authButton.html'
import { Meteor } from 'meteor/meteor'
//import { Template } from 'meteor/blaze-html-templates' <- DOESN'T WORK...


Template.authButton.events({
	'click #log-in'(e, t){
		e.preventDefault()
		$('#auth-modal')
		.modal({
			detachable: true,
			transition:'slide right'
		})
		.modal('show')
	},
	'click #log-out'(e, t){
		e.preventDefault()
		Meteor.logout()
	}
})