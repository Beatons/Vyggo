import './notFound.html'

Template.notFound.helpers({
	contentType() {
		return Template.instance().data.content || "Page"
	}
})