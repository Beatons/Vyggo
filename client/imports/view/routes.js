import './layouts/navigation.js'
import './pages/notFound.js'
import './pages/home.js'
import './pages/rooms.js'
import './pages/room.js'

BlazeLayout.setRoot('body')

FlowRouter.notFound = {
	name:'notFound',
	action() {
		BlazeLayout.render('navigation', {page:'notFound'})
	}
}

FlowRouter.route('/', {
	name:'home',
	action() {
		BlazeLayout.render('navigation', {page:'home'})
	}
})

const roomRoutes = FlowRouter.group({
	prefix:'/rooms',
	name:'roomRoutes'
})

roomRoutes.route('/', {
	name:'rooms',
	action() {
		BlazeLayout.render('navigation', {page:'rooms'})
	}
})

roomRoutes.route('/:name', {
	name:'room',
	action() {
		BlazeLayout.render('navigation', {page:'room'})
	}
})