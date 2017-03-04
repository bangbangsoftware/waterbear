import owner from 'src/components/signup/owner/owner'
import store from 'src/store.js'

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
               resolve(project)
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
   })
})
