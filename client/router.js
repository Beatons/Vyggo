FlowRouter.route("/", {
	name: "home",
	action(){
		BlazeLayout.render("default_layout", {
			page:"home"
		})
	}
})

let roomRoutes = FlowRouter.group({
	prefix: "/rooms",
	name: "rooms"
})

roomRoutes.route("/browse", {
	name: "browse",
	action(){
		BlazeLayout.render("default_layout", {
			page:"browse"
		})
	}
})

roomRoutes.route("/:id", {
	name: "room",
	action(){
		BlazeLayout.render("default_layout", {
			page:"room"
		})
	}
})