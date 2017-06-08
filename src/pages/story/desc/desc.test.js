import comp from './desc.js'

describe('desc.spec.js', () => {
   it('should have a bunch of functions', done => {
//      expect(comp.methods).toBe('function')
      expect(typeof comp.methods.storeTitle).toBe('function')
      expect(typeof comp.methods.storeDesc).toBe('function')
      done()
   })
})
