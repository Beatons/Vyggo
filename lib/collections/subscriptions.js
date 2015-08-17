Subscriptions = new Mongo.Collection('subscriptions');

Meteor.methods({
    subscribe: function(subscription) {
        Subscriptions.insert(subscription);
    }
});