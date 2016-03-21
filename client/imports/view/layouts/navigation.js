import './navigation.html'
import './navigation.css'

import './navigation/authButton.js'

//import { Template } from 'meteor/blaze-html-templates' <- DOESN'T WORK...


Template.navigation.events({
	'click #search-rooms-item'(e,t){
		e.preventDefault()
		t.$('#search-rooms-input').focus()
	},

	'click #search-rooms-submit'(e,t){
		e.preventDefault()
		t.$('#search-rooms-form').submit()
	},

	'click #create-room'(e, t) {
		e.preventDefault()

		$('#create-room-modal')
		.modal({
			detachable: true,
			transition:'slide right'
		})
		.modal('show')
	},

	'submit #search-rooms-form'(e,t){
		e.preventDefault()

		let input = e.target.search

		//do something with input.value

		input.value = ''
	}
})
