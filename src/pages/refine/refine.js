import store from '../../store.js'
// import Vue from 'vue'

import '../story/tags/tags'
import '../story/colours/colours'
import '../story/acceptance/acceptance'
import '../story/desc/desc'
import valid from '../story/valid'

import beforeCreate from '../../loginCheck.js'

const incompleteFilter = story => (story.tasks === undefined ||
    story.tasks.length === 0 ||
    story.points === undefined)
const completeFilter = story => !incompleteFilter(story)

export default {
    name: 'refine',
    beforeCreate,
    data: function() {
        return {
            story: store.state.session.story,
            session: store.state.session
        }
    },
    methods: {
        selectStory: function(story) {
            store.commit('story', story)
        },
        updateStory: function(story, points) {
            var ok = valid(story)
            if (!ok) {
                console.log('invalid story...')
                console.log(story)
                return
            }
            console.log('posting Story')
            store.commit('postStory')
            const prj = store.state.session.project
            console.log('Adding stories to..')
            console.log(prj)
            const db = store.state.db
            db.get(prj._id)
                .then(p => {
                    p.stories = prj.stories
                    return db.put(p)
                })
                .catch(err => console.error(err))
        },
        whatsNeeded: function(story) {
            valid(story)
        },
        startIncomplete: function(project) {
            const state = this.backlogState(project)
            if (state.incomplete.length === 0) {
                console.log('All stories are complete!')
                return
            }
            store.commit('incomplete', 0)
            const first = state.incomplete[store.state.session.incomplete]
            store.commit('currentStory', first)
            return first
        },
        nextIncomplete: function(project) {
            const state = this.backlogState(project)
            if (state.incomplete.length === 0) {
                console.log('All stories are complete!')
                return
            }
            if (state.incomplete.length === 1) {
                console.log('Only one incomplete story')
                store.commit('incomplete', 0)
                return
            }
            if (store.state.session.incomplete === undefined) {
                console.log('Setting incomplete index is missing, setting it to zero')
                store.commit('incomplete', 0)
                return state.incomplete[store.state.session.incomplete]
            }

            store.commit('incomplete', store.state.session.incomplete + 1)
            if (store.state.session.incomplete > state.incomplete.length - 1) {
                console.log('Incomplete index out of bounds, setting back to zero')
                store.commit('incomplete', 0)
                return state.incomplete[store.state.session.incomplete]
            }
            const next = state.incomplete[store.state.session.incomplete]
            return next
        },
        backlogState: function(project) {
            const incomplete = project.stories.filter(story => incompleteFilter(story))
            const complete = project.stories.filter(story => completeFilter(story))
            return {
                incomplete,
                complete
            }
        },
        navigateTo: function(nav) {
            this.$router.go({
                path: nav
            })
        }
    }
}
