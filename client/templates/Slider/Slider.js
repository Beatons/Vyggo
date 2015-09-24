Template.slider.events({
'click #subscribedrooms': function(event){
    event.preventDefault();
    $("#subscribedroomsslider").toggleClass("active"); 
    $("#subscribedrooms").toggleClass("toggle");  
}
});