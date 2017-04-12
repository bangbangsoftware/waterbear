import comp from 'src/components/story/acceptance/acceptance.js'

describe('acceptance.spec.js', () => {
   it('should have a bunch of functions  ', done => {
      const app = comp.methods
      expect(typeof app.addCriteria).to.equal('function')
      expect(typeof app.removeCriteria).to.equal('function')
      done()
   })
})
