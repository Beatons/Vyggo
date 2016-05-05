import './room_component.html'
import './room_component.css'
import './room_component/room_component_form.js'

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

const calcSize = (startEvent, endEvent, templateInstance) => {
	// this is a copy of calcMovePos, REFACTOR!
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
	this.state.set('moving', false)
	this.state.set('position.x', this.data.position.x)
	this.state.set('position.y', this.data.position.y)
	this.state.set('resizing', false)
	this.state.set('size.x', this.data.size.x)
})

Template.room_component.helpers({
	position() {
		const instance = Template.instance()

		return {
			x:instance.state.get('moving') ? instance.state.get('position.x') : instance.data.position.x,
			y:instance.state.get('moving') ? instance.state.get('position.y') : instance.data.position.y
		}
	},

	size() {
		const instance = Template.instance()

		return {
			x:instance.state.get('resizing') ? instance.state.get('size.x') : instance.data.size.x,
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

		t.state.set('moving', true)

		$(document).on('mousemove', ev => {
			ev.preventDefault()

			const position = calcMovePos(e, ev, t)

			t.state.set('position.x', position.x)
			t.state.set('position.y', position.y)
		})

		$(document).one('mouseup', ev => {
			ev.preventDefault()

			const 	{ roomId, _id } = t.data,
							position 		= calcMovePos(e, ev, t)

			Meteor.call('moveComponent', roomId, _id, position.x, position.y)

			t.state.set('moving', false)

			$(document).off('mousemove')
		})
	},

	'mousedown .resize-component'(e, t) {
		e.preventDefault()

		t.state.set('resizing', true)

		$(document).on('mousemove', ev => {
			ev.preventDefault()

			const size = calcSize(e, ev, t)

			t.state.set('size.x', size.x)
		})

		$(document).one('mouseup', ev => {
			ev.preventDefault()

			const 	{ roomId, _id } = t.data,
			size 		= calcSize(e, ev, t)

			Meteor.call('resizeComponent', roomId, _id, size.x)

			t.state.set('resizing', false)

			$(document).off('mousemove')
		})
	}
})
