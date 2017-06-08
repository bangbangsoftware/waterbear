import storyStore from './storyStore.js'

const story = {
   title: 'The last story',
   descAs: 'A story writer',
   descWant: 'to be able to start with a blank story',
   descThat: 'for convenience and clairty',
   tags: ['STORY'],
   colourNo: 40,
   acs: ['Must have all fields cleared'],
   valid: true
}


it('If clear story mutates story to have blank values', () => {
   const state = {
      story
   }
   storyStore.clearStory(state)
   expect(state.story.title.length).toBe(0)
   expect(state.story.descAs.length).toBe(0)
   expect(state.story.descWant.length).toBe(0)
   expect(state.story.descThat.length).toBe(0)
   expect(state.story.tags.length).toBe(0)
   expect(state.story.colourNo).toBe(4)
   expect(state.story.acs.length).toBe(0)
   expect(state.story.valid).toBe(false)
})

it('Should be able to select a story', () => {
   const state = {
      session: {
         project: {
            stories: [story]
         }
      }
   }
   storyStore.selectStory(state, 0)
   expect(story.selected).toBe(true)
})

it('Should be able to set current story', () => {
   const state = {
      session: {}
   }
   storyStore.currentStory(state, story)
   expect(state.session.story.title).toBe('The last story')
})

it('Should be able post a story', () => {
   const state = {
      session: {
         project: {}
      },
      story
   }
   storyStore.clearStory(state)
   storyStore.postStory(state)
   expect(state.session.project.stories.length).toBe(1)
})

it('Should be a able to add title to main story', () => {
   const state = {}
   storyStore.clearStory(state)
   storyStore.title(state, 'eak')
   expect(state.story.title).toBe('eak')
})
it('Should be a able to add title to main story', () => {
   const state = {
      story: {}
   }
   storyStore.clearStory(state)
   const desc = {
      as: 'as a sleepy person',
      want: 'to sleep',
      that: 'that I feel better'
   }
   storyStore.desc(state, desc)
   expect(state.story.descAs).toBe(desc.as)
   expect(state.story.descWant).toBe(desc.want)
   expect(state.story.descThat).toBe(desc.that)
})
it('Should be a able remove acceptance', () => {
   const state = {
      story: {}
   }
   storyStore.clearStory(state)
   const desc = {
      as: 'as a sleepy person',
      want: 'to sleep',
      that: 'that I feel better'
   }
   storyStore.desc(state, desc)
   expect(state.story.descAs).toBe(desc.as)
   expect(state.story.descWant).toBe(desc.want)
   expect(state.story.descThat).toBe(desc.that)
})
it('Should be a able to remove acceptance', () => {
   const state = {
      story: {
         acs: ['A bad acceptance']
      }
   }
   storyStore.clearStory(state)
   storyStore.removeAcceptance(state, 0)
   expect(state.story.acs.length).toBe(0)
})

it('Should be a able to add acceptance', () => {
   const state = {
      story: {
         acs: []
      }
   }
   storyStore.clearStory(state)
   storyStore.acceptance(state, "be able to test")
   expect(state.story.acs.length).toBe(1)
})
it('Should be a able to add change colour', () => {
   const state = {
      story: {}
   }
   storyStore.colour(state, 66)
   expect(state.story.colourNo).toBe(66)
})
