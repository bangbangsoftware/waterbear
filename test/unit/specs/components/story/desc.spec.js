import comp from 'src/components/story/desc/desc.js'

describe('desc.spec.js', () => {
   it('should have a bunch of functions', done => {
//      expect(comp.methods).to.equal('function')
      expect(typeof comp.methods.storeTitle).to.equal('function')
      expect(typeof comp.methods.storeDesc).to.equal('function')
      done()
   })
})
