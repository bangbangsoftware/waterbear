import store from '../../../store.js'
import Vue from 'vue'
import template from './acceptance.html'

const comp = {
   name: 'acceptance',
   template,
   data: function() {
      return {
         acs: store.state.story.acs,
         state: {
            newAc: '',
            error: ''
         }
      }
   },
   methods: {
      navigateTo: function(nav) {
         this.$router.go({
            path: nav
         })
      },
      addCriteria: ac => {
         if (ac && ac.length > 0) {
            store.commit('acceptance', ac)
         }
         const element = document.getElementById('newAc')
         if (element) {
            element.focus()
         }
         return {
            newAc: '',
            error: ''
         }
      },
      removeCriteria: acNo => {
         store.commit('removeAcceptance', acNo)
      }

   }
}
Vue.component('acceptance', comp)
export default comp
