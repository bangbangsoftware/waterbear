import valid from 'src/components/story/valid.js'

describe('valid.spec.js', () => {
   it('should be a functions', done => {
      expect(typeof valid).to.equal('function')
      done()
   })
})