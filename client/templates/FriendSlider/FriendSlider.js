Template.FriendSlider.events ({
	'click #friendslistbutton': function(event){
		event.preventDefault();
    $("#friendlistslider").toggleClass("activer"); 
    $(".superactive").toggleClass("open");  
	} 
});