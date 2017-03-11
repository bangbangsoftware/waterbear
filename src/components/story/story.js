import store from '../../store.js'
// import Vue from 'vue'

import './tags/tags'
import './list/list'
import './colours/colours'
import './acceptance/acceptance'
import './desc/desc'

export default {
   name: 'story',
   data: () => {
      return {
         story: store.state.story
      }
   },
   methods: {
      postStory: () => {
         console.log('Post Story')
         store.commit('validStory')
         if (store.state.story.valid) {
            store.commit('postStory')
         }
      },
      navigateTo: function(nav) {
         this.$router.go({
            path: nav
         })
      }
   }
}
