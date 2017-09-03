import validStory from './valid.js'
import store from '../../store.js'

export default {
    storyError: (state, message) => {
        state.session.story.error = message
        state.session.story.valid = false
    },
    storyOk: (state) => {
        state.session.story.error = ''
        state.session.story.valid = true
    },
    clearStory: (state) => {
        state.session.story = {
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
        if (state.session.story.index) {
            state.session.project.stories[state.session.story.index] = state.session.story
        } else {
            state.session.project.stories.push(state.session.story)
        }
        store.commit('log', 'Added "' + state.session.story.title + '" story')
        store.commit('clearStory')
    },
    moveStory: (state, movement) => {
        if (!state.session.project.stories) {
            state.session.project.stories = []
        }
        const newIndex = movement.index + movement.shift
        if (newIndex > state.session.project.stories.length || newIndex < 0) {
            return
        }
        const mover = state.session.project.stories[movement.index]
        state.session.project.stories[movement.index] = state.session.project.stories[newIndex]
        state.session.project.stories[newIndex] = mover
    },
    title: (state, t) => {
        state.session.story['title'] = t
        validStory(state.session.story)
    },
    desc: (state, desc) => {
        state.session.story.descAs = desc.as
        state.session.story.descWant = desc.want
        state.session.story.descThat = desc.that
        validStory(state.session.story)
    },
    removeAcceptance: (state, index) => {
        state.session.story.acs.splice(index, 1)
        validStory(state.session.story)
    },
    acceptance: (state, crit) => {
        state.session.story.acs.push(crit)
        validStory(state.session.story)
    },
    colour: (state, no) => {
        state.session.story.colourNo = no
    }
}
