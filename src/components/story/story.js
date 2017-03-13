import store from '../../store.js'
// import Vue from 'vue'

import './tags/tags'
import './list/list'
import './colours/colours'
import './acceptance/acceptance'
import './desc/desc'

export default {
   name: 'story',
   data: function() {
      return {
         story: store.state.story
      }
   },
   methods: {
      postStory: function() {
         console.log('Post Story')
         let err = store.commit('validStory')
         if (store.state.story.valid) {
            store.commit('postStory')
            return ''
         } else {
            return err
         }
      },
      whatsNeeded: function() {
         store.commit('validStory')
      },
      navigateTo: function(nav) {
         this.$router.go({
            path: nav
         })
      }
   }
}
