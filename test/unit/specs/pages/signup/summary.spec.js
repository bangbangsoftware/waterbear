import summary from 'src/pages/signup/summary/summary'
import store from 'src/store.js'

describe('summary.vue', () => {
   it('should have empy fields to start with ', () => {
      const data = summary.data()
      const stages = store.state.signup.stages
      const members = store.state.members
      expect(data.members.length).to.equal(members.length)
      expect(data.stages.length).to.equal(stages.length)
   })
})
