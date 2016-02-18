import './message.html'

Template.message.helpers({
    type(){
        return Template.instance().data.type
    },
    message(){
        return Session.get(Template.instance().data.key)
    }
})

Template.message.events({
    'click .close.icon'(e, t){
        e.preventDefault()
        Session.set(t.data.key, undefined)
    }
})
