import Vue from 'vue'

import store from '../../../store.js'

import template from './task.html'
import valid from './valid'
import util from '../util.js'

const comp = {
   name: 'task',
   template,
   beforeCreate: () => {
      if (!store.state.session.task) {
         store.commit('clearTask')
      }
   },
   data: () => {
      return {
         session: store.state.session,
         skills: store.state.defaults.skills,
         newSkill: 'Add skill'
      }
   },
   methods: {
      addTask: (p, task) => {
         let tasks = p.stories[store.state.session.story.index].tasks
         if (!tasks) {
            tasks = []
         }
         tasks.push(task)
         p.stories[store.state.session.story.index].tasks = tasks
         const db = store.state.db
         return db.put(p)
      },
      storeTask: task => {
         const prj = store.state.session.project
         console.log('Adding task to story')
         console.log(prj)
         const db = store.state.db
         db.get(prj._id)
            .then(p => comp.methods.addTask(p, task))
            .catch(err => console.error(err))
      },
      storeName: (value) => {
         store.commit('taskName', value)
      },
      storeDesc: (desc) => {
         store.commit('taskDesc', desc)
      },
      storeEst: (value) => {
         const num = parseInt(value)
         store.commit('taskEst', num)
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
         comp.methods.storeTask(task)
      },
      exit: function() {
         const state = util.next(this.session)
         store.commit('planState', state)
      }
   }
}

Vue.component('task', comp)
export default comp
