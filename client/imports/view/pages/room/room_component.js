import './room_component.html'
import './room_component.css'

Template.room_component.events({
	'click .remove-component'(e, t) {
		e.preventDefault()

		Meteor.call('removeComponent', t.data.roomId, t.data._id, error => {
			if(error)
				return console.log(error)
		})
	},

	'mousedown .move-component'(e, t) {
		$(document).one('mouseup', (ev) => {

			const 	{ pageX, pageY } 	= ev,
					{ roomId, _id } 	= t.data,
					boardOffset 		= $('#board').offset(),
					iconPosition 		= t.$(e.target).position(),
					iconDimensions 		= {
						height:e.target.offsetHeight, 
						width:e.target.offsetWidth
					},

					x = pageX 
							- boardOffset.left 
							- iconPosition.left
							- iconDimensions.width / 2,
					y = pageY 
							- boardOffset.top 
							- iconPosition.top
							- iconDimensions.height / 2

			Meteor.call('moveComponent', roomId, _id, x, y)
		})
	}
})