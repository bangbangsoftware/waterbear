import comp from 'src/pages/signup/team/team.js'

describe('team.spec.js', () => {
   xit('should have a bunch of functions  ', done => {
      expect(comp).to.equal('function')
      expect(typeof comp.methods.addrole).to.equal('function')
      done()
   })
})
