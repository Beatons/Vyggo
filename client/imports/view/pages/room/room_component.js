import './room_component.html'
import './room_component.css'

const calcMovePos = (startEvent, endEvent, templateInstance) => {
	const 	{ pageX, pageY } 	= endEvent,
			boardOffset 		= $('#board').offset(),
			iconPosition 		= templateInstance.$(startEvent.target).position(),
			iconDimensions 		= {
				height:startEvent.target.offsetHeight, 
				width:startEvent.target.offsetWidth
			},

			x = pageX 
				- boardOffset.left 
				- iconPosition.left
				- iconDimensions.width / 2,
			y = pageY 
				- boardOffset.top 
				- iconPosition.top
				- iconDimensions.height / 2

	return {x,y}
}

Template.room_component.onCreated(function() {
	this.state = new ReactiveDict()
	this.state.set('mousedown', false)
	this.state.set('mouseX', this.data.x)
	this.state.set('mouseY', this.data.y)
})

Template.room_component.helpers({
	position() {
		const instance = Template.instance()

		return {
			x:instance.state.get('mousedown') ? instance.state.get('mouseX') : instance.data.x,
			y:instance.state.get('mousedown') ? instance.state.get('mouseY') : instance.data.y
		}
	}
})

Template.room_component.events({
	'click .remove-component'(e, t) {
		e.preventDefault()

		Meteor.call('removeComponent', t.data.roomId, t.data._id, error => {
			if(error)
				return console.log(error)
		})
	},

	'mousedown .move-component'(e, t) {
		e.preventDefault()

		t.state.set('mousedown', true)

		$(document).on('mousemove', ev => {
			
			const position = calcMovePos(e, ev, t)

			t.state.set('mouseX', position.x)
			t.state.set('mouseY', position.y)
		})

		$(document).one('mouseup', ev => {
			ev.preventDefault()

			const 	{ roomId, _id } = t.data,
					position 		= calcMovePos(e, ev, t)

			Meteor.call('moveComponent', roomId, _id, position.x, position.y)

			t.state.set('mousedown', false)

			$(document).off('mousemove')
		})
	},
})