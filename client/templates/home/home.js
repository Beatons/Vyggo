Subscriptions = new Mongo.Collection('subscriptions');

if (Meteor.isClient) {
  Template.home.events({
    "submit #subscribe":function(event) {
        
        var fn = event.target.firstname;
        var ln = event.target.lastname;
        var em = event.target.email;
        var ie = event.target.interest;
        var nl = event.target.newsletter;

        Meteor.call('subscribe', {
            firstname: fn.value,
            lastname: ln.value,
            email: em.value,
            interest: ie.value,
            newsletter: nl.checked
        });

        fn.value = '';
        ln.value = '';
        em.value = '';
        ie.value = '';
        nl.checked = false;

        document.getElementById('Label1').display = 'block';

        event.preventDefault();
    },
      
    "click #logo2":function(event) {
        document.getElementById('theme').href = 'dark/dark.css';
    },
      
    "click #logo22":function(event) {
        document.getElementById('theme').href = 'client/templates/home/home.css';
    }
  });
}

Meteor.methods({
    subscribe: function(subscription) {
        Subscriptions.insert(subscription);
    }
});