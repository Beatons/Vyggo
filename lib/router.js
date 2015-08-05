
Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('/home'
	);
	
	this.route('/rooms/:_id', {
		waitOn: function() {
			return Meteor.subscribe('room', this.params._id);
			console.log(this.params.id);
		},
		action: function() {
			this.render('room');
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