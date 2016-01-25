Template.authButton.events({
	'click #log-in'(e, t){
		e.preventDefault()
		$('#auth-modal')
		.modal({detachable: true})
		.modal('show')
	},
	'click #log-out'(e, t){
		e.preventDefault()
		Meteor.logout()
	}
})