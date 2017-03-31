import store from 'src/store.js'
import check from 'src/loginCheck.js'
import Vue from 'vue'

describe('login check depends on db', () => {
   it('should not be valid if no db ', () => {
      check().then(answer => {
         expect(answer).to.equal(false)
         expect(store.state.session.error).to.equal('Need to login')
      })
      Vue.nextTick()
   })
   it('should be valid if there is a db ', () => {
      store.commit('db', {})
      check().then(answer => {
         expect(answer).to.equal(true)
         expect(store.state.session.error).to.equal('')
      })
      Vue.nextTick()
   })
})
