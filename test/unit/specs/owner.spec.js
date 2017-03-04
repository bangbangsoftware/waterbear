import owner from 'src/components/signup/owner/owner'
import store from 'src/store.js'
import Vue from 'vue'

describe('owner.vue', () => {
   beforeEach(() => {
      // store setup
      const project = {
         _id: 'faker'
      }
      store.commit('project', project)
      const fakeDB = {
         get: id => {
            return new Promise((resolve, reject) => {
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
      expect(data.ownerName).to.equal('')
      expect(data.ownerRole).to.equal('')
      expect(data.error).to.equal('')
   })

   it('should have default roles available', () => {
      const data = owner.data()
      const defaults = store.state.defaults.roles
      expect(data.roles.length).to.equal(defaults.length)
   })

   it('should validate blank owner\'s name', () => {
      const poster = owner.methods.owner
      expect(poster('', '')).to.equal('What\'s your name?')
   })

   it('should validate owner\'s name', () => {
      const poster = owner.methods.owner
      expect(poster('Fred', '')).to.equal('')
      Vue.nextTick(() => {
         expect(store.state.project.owner).to.equal('Fred')
         const defaults = store.state.defaults.roles
         expect(store.state.project.defaults.roles.length).to.equal(defaults.length)
         expect(store.state.stages.length).to.equal(1)
         expect(store.state.stages[0].name).to.equal('Fred')
         expect(store.state.feed.length).to.equal(1)
         expect(store.state.feed[0].message).to.equal('Hi Fred')
      })
   })
})
