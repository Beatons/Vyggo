Template.navigation.events({
	'click #search-rooms-item'(e,t){
		e.preventDefault()
		t.$('#search-rooms-input').focus()
	},

	'click #search-rooms-submit'(e,t){
		e.preventDefault()
		t.$('#search-rooms-form').submit()
	},

	'submit #search-rooms-form'(e,t){
		e.preventDefault()

		let input = e.target.search

		//do something with input.value

		input.value = ''
	}
})