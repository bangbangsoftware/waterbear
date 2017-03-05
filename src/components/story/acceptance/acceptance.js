// import store from '../../store.js'
import Vue from 'vue'
import template from './acceptance.html'

const comp = {
   name: 'acceptance',
   template,
   data: function() {
      return {}
   },
   methods: {
      navigateTo: function(nav) {
         this.$router.go({
            path: nav
         })
      }
   }
}
Vue.component('acceptance', comp)
export default comp
