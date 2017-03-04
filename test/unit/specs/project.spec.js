import project from 'src/components/signup/project/project'
// import store from 'src/store.js'

describe('project.vue', () => {
   it('should have empy fields to start with ', () => {
      const data = project.data()
      expect(data.projectName).to.equal('')
      expect(data.error).to.equal('')
      expect(data.session.error).to.equal('')
   })
})
