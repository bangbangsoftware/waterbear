import comp from 'src/components/member/skills/skills.js'

describe('skills.spec.js', () => {
   it('should have data', done => {
      const data = comp.data
      expect(typeof data).to.equal('function')
      done()
   })
})
