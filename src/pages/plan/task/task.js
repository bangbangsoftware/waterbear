import Vue from 'vue'

import store from '../../../store.js'

import template from './task.html'
import valid from './valid'

const storeTask = (task) => {
   const prj = store.state.session.project
   console.log('Adding task to story')
   console.log(prj)
   const db = store.state.db
   db.get(prj._id)
      .then(p => {
         let tasks = p.stories[store.state.session.story.index].tasks
         if (!tasks) {
            tasks = []
         }
         tasks.push(task)
         p.stories[store.state.session.story.index].tasks = tasks
         return db.put(p)
      })
      .catch(err => console.error(err))
}

const comp = {
   name: 'task',
   template,
   beforeCreate: () => {
      store.commit('clearTask')
   },
   data: () => {
      return {
         session: store.state.session
      }
   },
   methods: {
      storeName: (value) => {
         store.commit('taskName', value)
      },
      storeDesc: (desc) => {
         store.commit('taskDesc', desc)
      },
      storeEst: (value) => {
         store.commit('taskEst', value)
      },
      storeSkill: (value) => {
         store.commit('taskSkill', value)
      },
      postTask: function(task) {
         var ok = valid(task)
         if (!ok) {
            console.log('invalid task...')
            console.log(task)
            return
         }
         console.log('posting task')
         store.commit('task', task)
         storeTask(task)
      }
   }
}

Vue.component('task', comp)
export default comp
