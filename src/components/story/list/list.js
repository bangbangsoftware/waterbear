import store from '../../../store.js'
import Vue from 'vue'
import template from './list.html'

const comp = {
   name: 'list',
   template,
   data: function() {
      return {
         project: store.state.session.project
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
