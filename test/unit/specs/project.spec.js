import project from 'src/components/signup/project/project'
import store from 'src/store.js'

describe('project.spec.js', () => {
   it('should have empy fields to start with ', () => {
      store.commit('db', {
         'fakedb': 'true'
      })
      const data = project.data()
      expect(data.projectName).to.equal('')
      expect(data.error).to.equal('')
    //  expect(store.state.session.error).to.equal('Need to login')
      expect(store.state.session.error).to.equal('')
   })
})
