import comp from 'src/pages/member/name/name.js'

describe('name.spec.js', () => {
   it('should have a bunch of functions', done => {
      const app = comp.methods
      expect(typeof app.newNick).to.equal('function')
      done()
   })
})
