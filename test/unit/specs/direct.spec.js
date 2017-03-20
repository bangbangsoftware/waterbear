import direct from 'src/direct.js'

describe('Redirect depending on state', () => {
   it('should if no hours then redirect to member screen ', () => {
      const answer = direct({})
      expect(answer).to.equal('member')
   })
   it('should diect to story if has hours', () => {
      const answer = direct({
         hours: [{}, {}]
      })
      expect(answer).to.equal('story')
   })
})
