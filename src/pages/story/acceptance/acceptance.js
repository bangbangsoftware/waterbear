import store from '../../../store.js'
import Vue from 'vue'
import template from './acceptance.html'

const comp = {
   name: 'acceptance',
   template,
   data: function() {
      return {
         state: {
            newAc: '',
            acs: store.state.session.story.acs,
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
            acs: store.state.session.story.acs,
            error: ''
         }
      },
      removeCriteria: acNo => {
         store.commit('removeAcceptance', acNo)
         return {
            newAc: '',
            acs: store.state.session.story.acs,
            error: ''
         }
      }

   }
}
Vue.component('acceptance', comp)
export default comp
