import store from '../../../store.js'
import Vue from 'vue'
import template from './name.html'

const comp = {
   name: 'name',
   template,
   data: function() {
      return {
         session: store.state.session
      }
   },
   beforeCreate: function() {
      const element = document.getElementById('name')
      if (element) {
         element.focus()
      }
   }
}

Vue.component('name', comp)
export default comp
