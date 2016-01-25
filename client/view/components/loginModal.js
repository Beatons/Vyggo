Template.loginModal.events({
	'submit #login-form'(e, t){
		e.preventDefault()

		let identity = e.target.identity,
			password = e.target.password

		Meteor.loginWithPassword(identity.value, password.value, function(error){
			if (error)
				return
			Meteor.logoutOtherClients()
		})
	}
})