import './banner.html'

Template.banner.helpers({
	content() {
		return Template.instance().data.content
	},

	icon() {
		return Template.instance().data.icon
	},

	details() {
		return Template.instance().data.details
	}
})