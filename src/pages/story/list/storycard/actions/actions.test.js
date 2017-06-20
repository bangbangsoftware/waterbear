import Actions from './actions.js'

describe('acceptance.spec.js', () => {
   it('should have a bunch of functions  ', done => {
      expect(typeof Actions.methods.editStory).toBe('function')
      expect(typeof Actions.methods.removeStory).toBe('function')
      expect(typeof Actions.methods.breakStory).toBe('function')
      done()
   })

   it('should edit story', () => {
        Actions.methods.editStory();
   })
   it('should remove story', () => {
        Actions.methods.removeStory();
   })
   it('should break story', () => {
        Actions.methods.breakStory();
   })
})
