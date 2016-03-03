import './room_component.html'

Template.room_component.events({
	'click .remove-component'(e, t) {
		e.preventDefault()

		Meteor.call('removeComponent', t.data.roomId, t.data._id, error => {
			if(error)
				return console.log(error)
		})
	}
})