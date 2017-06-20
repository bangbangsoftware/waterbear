import StoryCard from './storycard.js'

describe('acceptance.spec.js', () => {
   it('should have a bunch of functions  ', done => {
      expect(typeof StoryCard.data).toBe('function')
          const defaultData = StoryCard.data()
      done()
   })
})
