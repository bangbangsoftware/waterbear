import store from '../../../store.js'
import Vue from 'vue'
import template from './skills.html'

const comp = {
   name: 'skills',
   template,
   data: function() {
      return {
         skills: store.state.session.user.skills,
         taglist: [] // store.state.defaults
      }
   }
}

Vue.component('skills', comp)
export default comp
