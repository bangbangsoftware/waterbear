import owner from './owner.js'
import store from '../../../store.js'
import Vue from 'vue'

beforeEach(() => {
   // store setup
   const project = {
      _id: 'faker',
      stories: []
   }
   store.commit('project', project)
   const fakeDB = {
      get: id => {
         return new Promise((resolve, reject) => {
            console.log(id)
            resolve(project)
         })
      },
      put: prj => {
         return new Promise((resolve, reject) => {
            console.log(prj)
            resolve(prj)
         })
      }
   }
   store.commit('db', fakeDB)
})

it('should set owner up with blank fields', () => {
   const data = owner.data()
   expect(data.ownerName).toBe('')
   expect(data.ownerRole).toBe('')
   expect(data.error).toBe('')
})

it('should have default roles available', () => {
   const data = owner.data()
   const defaults = store.state.defaults.roles
   expect(data.roles.length).toBe(defaults.length)
})

it('should validate blank owner\'s name', () => {
   const poster = owner.methods.owner
   expect(poster('', '')).toBe('What\'s your name?')
})

it('should validate owner\'s name', () => {
   const email = 'boom@boom.com'
   store.commit('stage', {
      email
   })
   const poster = owner.methods.owner
   expect(poster('Fred', '')).toBe('')
   Vue.nextTick(() => {
      expect(store.state.project.owner).toBe('Fred')
      const defaults = store.state.defaults.roles
      expect(store.state.project.defaults.roles.length).toBe(defaults.length)
      expect(store.state.stages.length).toBe(1)
      expect(store.state.stages[0].name).toBe('Fred')
      expect(store.state.feed.length).toBe(1)
      expect(store.state.feed[0].message).toBe('Hi Fred')
   })
})

it('should validate owner\'s name and role', () => {
   const poster = owner.methods.owner
   expect(poster('Dick', 'Superman')).toBe('')
   Vue.nextTick(() => {
      const defaults = store.state.defaults.roles
      expect(store.state.project.defaults.roles.length).toBe(defaults.length)
      expect(store.state.stages.length).toBe(1)
      expect(store.state.stages[0].name).toBe('Dick')
      expect(store.state.stages[0].role).toBe('Superman')
      expect(store.state.feed.length).toBe(1)
      expect(store.state.feed[0].message).toBe('Hi Dick')
   })
})
