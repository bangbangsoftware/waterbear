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
      postStory: function(story) {
         var ok = valid(story)
         if (ok) {
            console.log('posting Story')
            store.commit('postStory')
         } else {
            console.log('invalid story...')
            console.log(story)
         }
      },
      whatsNeeded: function(story) {
         valid(story)
      },
      navigateTo: function(nav) {
         this.$router.go({
            path: nav
         })
      }
   }
}
