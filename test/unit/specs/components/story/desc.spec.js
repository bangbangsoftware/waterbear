import comp from 'src/components/story/desc/desc.js'

describe('tags.spec.js', () => {
   it('should have a bunch of functions', done => {
      const app = comp.methods
      expect(typeof app.storyTitle).to.equal('function')
      expect(typeof app.storyDesc).to.equal('function')
      done()
   })
})
