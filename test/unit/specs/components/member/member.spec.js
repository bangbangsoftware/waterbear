import comp from 'src/components/member/member.js'

describe('member.spec.js', () => {
   it('should have a bunch of functions', done => {
      const app = comp.methods
      expect(typeof app.save).to.equal('function')
      done()
   })
})
