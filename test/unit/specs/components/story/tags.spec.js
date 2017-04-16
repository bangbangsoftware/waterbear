import comp from 'src/components/story/tags/tags.js'

describe('tags.spec.js', () => {
   it('should have a functions', done => {
      expect(typeof comp.methods.navigateTo).to.equal('function')
      done()
   })
})
