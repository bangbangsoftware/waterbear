import store from '../../store.js'
// import Vue from 'vue'

import './tags/tags'
import './list/list'
import './colours/colours'
import './acceptance/acceptance'
import './desc/desc'

import valid from './valid.js'

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
         valid()
         if (store.state.story.valid) {
            store.commit('postStory')
         }
      },
      whatsNeeded: function() {
         valid()
      },
      navigateTo: function(nav) {
         this.$router.go({
            path: nav
         })
      }
   }
}
