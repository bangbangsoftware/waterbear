import comp from './acceptance.js'

describe('acceptance.spec.js', () => {
   it('should have a bunch of functions  ', done => {
      const app = comp.methods
      expect(typeof app.addCriteria).toBe('function')
      expect(typeof app.removeCriteria).toBe('function')
      done()
   })
})
