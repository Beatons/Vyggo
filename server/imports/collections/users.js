import { Meteor } from 'meteor/meteor'
//import { Account } from 'meteor/accounts-password'

Meteor.publish("room.users", function(ids){
	if (!ids)
		return this.ready()
	return Meteor.users.find({_id: {$in: ids}})
})

Accounts.onCreateUser((options, user)=>{
	user.features = { roomAmount: 1 } //default features
	if (options.profile)
		user.profile = options.profile
	return user
})
