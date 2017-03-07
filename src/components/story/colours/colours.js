import store from '../../../store.js'
import Vue from 'vue'
import template from './colours.html'

const comp = {
   name: 'colours',
   template,
   data: function() {
      return {
         colours: store.state.defaults.colours,
         colourClasses: store.state.defaults.colourClasses,
         coloursClass: 'black',
         selectedColour: 'black'
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

Vue.component('colours', comp)
export default comp
