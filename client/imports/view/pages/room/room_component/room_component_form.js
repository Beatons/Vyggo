import './room_component_form.html'
import './room_component_form.css'

Template.room_component_form.onRendered(function(){
  this.$('#urlTemplate').dropdown({})
})

Template.room_component_form.onCreated(function(){
  this.state = new ReactiveDict()
  this.state.set('template', 'website')
})

Template.room_component_form.events({
  'submit #urlForm'(e, t){
    e.preventDefault()

    const url = e.target.url.value
    const {roomId, _id} = t.data

    Meteor.call('setComponentUrl', roomId, _id, url)
  },

  'change select'(e, t){
    e.preventDefault()
    t.state.set('template', e.target.value)
  }
})

Template.room_component_form.helpers({
  inputStyle(){
    switch(Template.instance().state.get('template')){
      case 'website' :
        return {
          colour: 'positive' ,
          icon: 'world',
          placeholder: 'http://vyggo.com'
      }
      case 'twitch' :
        return {
          colour: 'violet' ,
          icon: 'twitch',
          placeholder: 'twitch channel name'
      }
      case 'youtube' :
        return {
          colour: 'red' ,
          icon: 'youtube',
          placeholder: 'https://youtube.com/watch?v=123abc'
      }
    }
  }
})
