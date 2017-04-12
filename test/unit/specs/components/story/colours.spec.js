import comp from 'src/components/story/colours/colours.js'

describe('colour.spec.js', () => {
   it('should have a bunch of functions', done => {
      const app = comp.methods
      expect(typeof app.navigateTo).to.equal('function')
      expect(typeof app.changeColour).to.equal('function')
      done()
   })
})
