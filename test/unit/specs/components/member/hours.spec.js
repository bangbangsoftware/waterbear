import comp from 'src/components/member/hours/hours.js'

describe('hours.spec.js', () => {
   it('should have a bunch of functions', done => {
      const app = comp.methods
      expect(typeof app.toggleDay).to.equal('function')
      expect(typeof app.toggleNight).to.equal('function')
      done()
   })
})
