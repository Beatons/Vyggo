import './room_users.html'

Template.room_users.helpers({
	counter() {
		return `Users (${this.userCount}/${this.threshold})`
	}
})