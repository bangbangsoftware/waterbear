import store from 'src/store.js'
import loginCheck from 'src/loginCheck.js'

describe('login Check', () => {
   it('should error if no database', () => {
      const answer = loginCheck()
      expect(answer).to.equal(false)
      expect(store.state.session.error).to.equal('Need to login')
   })
   it('should not error if database', () => {
      store.commit('db', {
         'fakedb': 'true'
      })
      const answer = loginCheck()
      expect(answer).to.equal(true)
      expect(store.state.session.error).to.equal('')
   })

})
