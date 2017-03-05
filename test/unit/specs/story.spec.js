import story from 'src/components/story/story'
// import store from 'src/store.js'

describe('story.vue', () => {
   it('should default to invalid story ', () => {
      const valid = story.mutations.valid
      expect(valid()).to.equal(false)
   })
})
