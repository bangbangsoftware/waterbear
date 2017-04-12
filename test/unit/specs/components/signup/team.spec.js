import comp from 'src/components/signup/team/team.js'

describe('team.spec.js', () => {
   it('should have a bunch of functions  ', done => {
      const team = comp.methods
      console.log(team)
     // expect(typeof team.addMember).to.equal('function')
      expect(typeof team.addrole).to.equal('function')
      done()
   })
})
