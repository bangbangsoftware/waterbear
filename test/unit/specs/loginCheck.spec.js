import store from 'src/store.js'
import check from 'src/loginCheck.js'

describe('login check depends on db', () => {
   it('should not be valid if no db ', () => {
      const answer = check()
      expect(answer).to.equal(false)
      expect(store.state.session.error).to.equal('Need to login')
   })
   it('should be valid if there is a db ', () => {
      store.commit('db', {})
      const answer = check()
      expect(answer).to.equal(true)
      expect(store.state.session.error).to.equal('')
   })
})
