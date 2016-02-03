Template.createRoomModal.events({
	'submit #create-room-form'(e, t) {
		e.preventDefault()

		let name 			= e.target.name,
				threshold = e.target.threshold

		Meteor.call('insertRoom', {name:name.value, threshold:threshold.value}, error => {
			if(error)
				return console.log(error)

			$('#create-room-modal').modal('hide')

			FlowRouter.go('room', {name:name.value})

			name.value 			= ''
			threshold.value = ''
		})
	}
})
