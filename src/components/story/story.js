import store from '../../store.js'
// import Vue from 'vue'

import './tags/tags'
import './list/list'
import './colours/colours'
import './acceptance/acceptance'
import './desc/desc'

import beforeCreate from '../../loginCheck.js'

import valid from './valid.js'

export default {
   name: 'story',
   beforeCreate,
   data: function() {
      return {
         story: store.state.story
      }
   },
   methods: {
      postStory: function(story) {
         var ok = valid(story)
         if (!ok) {
            console.log('invalid story...')
            console.log(story)
            return
         }
         console.log('posting Story')
         store.commit('postStory')
         const prj = store.state.session.project
         console.log('Adding stories to..')
         console.log(prj)
         const db = store.state.db
         db.get(prj._id)
            .then(p => {
               p.stories = prj.stories
               return db.put(p)
            })
            .catch(err => console.error(err))
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
