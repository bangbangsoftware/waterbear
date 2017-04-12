import comp from 'src/components/story/list/list.js'

describe('list.spec.js', () => {
   it('should have a bunch of functions', done => {
      const app = comp.methods
      expect(typeof app.navigateTo).to.equal('function')
      done()
   })
})
