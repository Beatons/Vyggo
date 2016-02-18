import './authModal.html'
import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'
import './message.js'
//import { Accounts } from 'meteor/accounts-password'
//import { Template } from 'meteor/blaze-html-templates' <- DOESN'T WORK...


Template.authModal.onCreated(function(){
	this.state = new ReactiveDict()
	this.state.set('isSignup', false)
})

Template.authModal.helpers({
	isSignup(){
		return Template.instance().state.get('isSignup')
	}
})

Template.authModal.events({
	'click #toggle-isSignup'(e, t) {
		e.preventDefault()
		Session.set('authModal', undefined)
		t.state.set('isSignup', !t.state.get('isSignup'))
	},

	'submit #login-form'(e, t){
		e.preventDefault()

		let identity = e.target.identity,
			password = e.target.password

		Meteor.loginWithPassword(identity.value, password.value, error => {
			Session.set('authModal', error ? {content: error.reason, details: error.details} : undefined)
			if(error)
				return

			Meteor.logoutOtherClients()

			$('#auth-modal')
				.modal({onHidden() { t.state.set('isSignup', false) }})
				.modal('hide')
		})
	},

	'submit #signup-form'(e, t){
		e.preventDefault()

		let username 	= e.target.username,
			email		= e.target.email,
			password 	= e.target.password,
			confirm 	= e.target.confirm

			if(password.value !== confirm.value)
				return console.log(new Meteor.Error("passwords don't match"))

		Accounts.createUser({username: username.value, email: email.value, password: password.value}, error => {
			Session.set('authModal', error ? {content: error.reason, details: error.details} : undefined)
			if(error)
				return

			Meteor.logoutOtherClients()

			$('#auth-modal')
				.modal({onHidden() { t.state.set('isSignup', false) }})
				.modal('hide')
		})
	}
})
