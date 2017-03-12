import store from '../../../store.js'
import Vue from 'vue'
import template from './list.html'
import '../colours/colours.css'

const comp = {
   name: 'list',
   template,
   data: function() {
      return {
         project: store.state.session.project,
         colourClasses: store.state.defaults.colourClasses
      }
   },
   methods: {
      navigateTo: function(nav) {
         this.$router.go({
            path: nav
         })
      }
   }
}
Vue.component('list', comp)
export default comp
