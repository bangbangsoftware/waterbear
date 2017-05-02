import Vue from 'vue'

import template from './backlog.html'

import store from '../../../store.js'
import user from '../../../user.js'

const storeSprints = () => {
   const prj = store.state.session.project
   console.log('Adding task to sprint')
   console.log(prj)
   const db = store.state.db
   db.get(prj._id)
      .then(p => {
         p.sprints = store.state.session.sprints
         return db.put(p)
      })
      .catch(err => console.error(err))
}

const comp = {
   name: 'backlog',
   template,
   data: () => {
      return {
         session: store.state.session,
         project: store.state.session.project,
         colourClasses: store.state.defaults.colourClasses
      }
   },
   methods: {
      save: () => {
         const session = store.state.session
         user.updateUser(session.user, session.project)
      },
      selectStory: (i) => {
         console.log('story selected is number ' + i)
         store.commit('selectStory', i)
      },
      selectTask: (i, task) => {
         console.log('story selected is number ' + i)
         store.commit('selectStory', i)
         store.commit('selectTask', task)
      },
      addToSprint: function(task) {
         store.commit('addToSprint', task.index)
         storeSprints()
      }
   }
}

Vue.component('backlog', comp)
export default comp
