import direct from './direct.js'
import store from './store.js'
import Vue from 'vue'

describe('redirect.spec.js', () => {
   it('should handle a user that is associated with a missing projects  ', done => {
      const failFakeDB = {
         get: prj => {
            console.log('fail fakeDB get called with :' + prj)
            return new Promise((resolve, reject) => {
               console.log(prj + ': fake DB direct has come back.....')
               reject(prj + ' just isn\'t there')
               done()
            })
         },
         nb: 'This a failing fakeDB'
      }

      const user = {
         currentProject: 'redirectSpecProject'
      }
      direct(user, failFakeDB)
         .then(ok => {
            console.log('back with ' + ok)
            done()
         })
         .catch(err => {
            expect(err).toBe('redirectSpecProject just isn\'t there')
         })

      Vue.nextTick(() => {
         done()
      })
   })

   it('should handle direct a project owner without hours to member screen', done => {
      const fakeDB = {
         get: prj => {
            console.log('fakeDB get called')
            return new Promise((resolve, reject) => {
               resolve({
                  owner: {
                     email: 'fred@fred.com'
                  }
               })
               done()
            })
         },
         nb: 'This a fakeDB'
      }
      console.log(fakeDB)

      const user = {
         currentProject: 'bingo',
         email: 'fred@fred.com',
         hours: undefined
      }
      direct(user, fakeDB)
      Vue.nextTick(() => {
         console.log('THE END')
         expect(store.state.project.owner.email).toBe('FAILfred@fred.com')
         expect(store.state.feed[0]).toBe('fred@fred.com logged on')
         expect(store.state.session.user.email).equal('freiid@fred.com')
         done()
      })
   })
})
