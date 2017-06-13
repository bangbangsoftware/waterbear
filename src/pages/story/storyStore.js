import validStory from './valid.js'
import store from '../../store.js'

export default {
   storyError: (state, message) => {
      state.story.error = message
      state.story.valid = false
   },
   storyOk: (state) => {
      state.story.error = ''
      state.story.valid = true
   },
   clearStory: (state) => {
      state.story = {
         title: '',
         descAs: '',
         descWant: '',
         descThat: '',
         tags: [],
         colourNo: 4,
         acs: [],
         valid: false
      }
   },
   selectStory: (state, selected) => {
      const stories = state.session.project.stories
      const selectedStories = stories.map((story, i) => {
         story.selected = (i === selected)
         return story
      })
      state.session.project.stories = selectedStories
      const theStory = selectedStories[selected]
      theStory.index = selected
      store.commit('currentStory', theStory)
   },
   currentStory: (state, story) => {
      state.session.story = story
   },
   deleteStory: (state, selected) => {
   // this doesnt seem right?? is this right?
    store.state.session.project.stories.splice(selected, 1)
   },
   postStory: (state) => {
      if (!state.session.project.stories) {
         state.session.project.stories = []
      }
      state.session.project.stories.push(state.story)
      store.commit('log', 'Added "' + state.story.title + '" story')
      store.commit('clearStory')
   },
   title: (state, t) => {
      state.story['title'] = t
      validStory(state.story)
   },
   desc: (state, desc) => {
      state.story.descAs = desc.as
      state.story.descWant = desc.want
      state.story.descThat = desc.that
      validStory(state.story)
   },
   removeAcceptance: (state, index) => {
      state.story.acs.splice(index, 1)
      validStory(state.story)
   },
   acceptance: (state, crit) => {
      state.story.acs.push(crit)
      validStory(state.story)
   },
   colour: (state, no) => {
      state.story.colourNo = no
   }
}
