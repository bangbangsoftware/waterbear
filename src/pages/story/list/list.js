import store from '../../../store.js'
import Vue from 'vue'
import template from './list.html'
import '../colours/colours.css'
import './list.css'
import StoryCard from './storycard/storycard'

const comp = {
   name: 'list',
   template,
   data: function() {
      return {
         session: store.state.session,
         colourClasses: store.state.defaults.colourClasses
      }
   },
    components: {
        'storyCard': StoryCard
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
