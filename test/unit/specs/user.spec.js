import user from 'src/user.js'

describe('user.spec.js', () => {
   it('should handle bunch of functions  ', done => {
      expect(typeof user.owner).to.equal('function')
      expect(typeof user.replaceMember).to.equal('function')
      expect(typeof user.storeMembers).to.equal('function')
      expect(typeof user.login).to.equal('function')
      expect(typeof user.signup).to.equal('function')
      expect(typeof user.currentProject).to.equal('function')
   })
})
