Template.loginModal.events({
	'submit #login-form'(e, t){
		e.preventDefault()
		
		let identity = e.target.identity,
			password = e.target.password

		Meteor.loginWithPassword(identity.value, password.value, error => {
			if(error)
				return console.log(error)

			Meteor.logoutOtherClients()

			$('#login-modal').modal('hide')
		})
	}
})