Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: '404'
});

Router.map(function() {
	this.route('/home', {
		waitOn: function() {
			return Meteor.subscribe('subscriptions');
		}
	});
	this.route('/rooms/:_id', {
		waitOn: function() {
			return Meteor.subscribe('room', this.params._id);
		},

		action: function() {
			if(this.ready()) {
				switch(Rooms.find().count()) {
					case 0: 
						this.render('404');
						break;
					case 1:
						this.render('room');
						break;
					default:
						throw new Meteor.Error(
							'Something went wrong', 
							'More rooms with same name in database'
						);
						break;
				}
			}
		}
	});

	//redirects
	this.route('/rooms', 
		function() { 
			this.redirect('home'); 
		}
	);

	this.route('/', 
		function() { 
			this.redirect('home'); 
		}
	);
	//
});