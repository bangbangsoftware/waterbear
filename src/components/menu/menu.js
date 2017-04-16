import store from '../../store.js'
import Vue from 'vue'
import template from './menu.html'

const comp = {
   name: 'menu',
   template,
   data: function() {
      return {
         session: store.state.session
      }
   }
}

Vue.component('menu', comp)
export default comp
