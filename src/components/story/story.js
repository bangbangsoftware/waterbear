import store from '../../store.js'
// import Vue from 'vue'

import './tags/tags'
import './list/list'
import './colours/colours'
import './acceptance/acceptance'
import './desc/desc'

export default {
   name: 'story',
   computed: {
      watch: function() {
         if (store.state.story.descAs.length === 0) {
            return false
         }

         if (store.state.story.descWant.length === 0) {
            return false
         }

         if (store.state.story.descThat.length === 0) {
            return false
         }

         if (store.state.story.acceptance.length === 0) {
            return false
         }
         return true
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
