import './room_controls.html'

Template.room_controls. events({
    'click #add-component'(e, t){
        e.preventDefault()
        Meteor.call('addComponent', t.data.roomId, error => {
            Session.set('room', error ? {content: error.error} : undefined)
            if (error)
                return
        })
    }
})
