import comp from 'src/components/story/tags/tags.js'

describe('tags.spec.js', () => {
   it('should have a bunch of functions', done => {
      const app = comp.methods
      expect(typeof app.navigateTo).to.equal('function')
      done()
   })
})
