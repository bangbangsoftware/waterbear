import comp from 'src/components/login/login.js'

describe('login.spec.js', () => {
   it('should have a bunch of functions  ', done => {
      const login = comp.methods
      expect(typeof login.login).to.equal('function')
      done()
   })
})