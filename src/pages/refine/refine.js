import store from '../../store.js'
import Vue from 'vue'
import template from './refine.html'

import '../story/tags/tags'
import '../story/colours/colours'
import '../story/acceptance/acceptance'
import '../story/desc/desc'
import valid from '../story/valid'

import check from '../../loginCheck.js'

const incompleteFilter = story => (story.tasks === undefined ||
    story.tasks.length === 0 ||
    story.points === undefined)
const completeFilter = story => !incompleteFilter(story)

const jumpIncomplete = (project, amount) => {
    const state = comp.methods.backlogState(project)
    const lastIndex = state.incomplete.length - 1

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

    store.commit('incomplete', store.state.session.incomplete + amount)
    if (store.state.session.incomplete > lastIndex) {
        console.log('Incomplete index out of bounds, setting back to zero')
        store.commit('incomplete', 0)
        return state.incomplete[store.state.session.incomplete]
    }

    if (store.state.session.incomplete < -1) {
        console.log('Incomplete index less than zero, setting back to end')
        store.commit('incomplete', lastIndex)
        return state.incomplete[store.state.session.incomplete]
    }
    const next = state.incomplete[store.state.session.incomplete]
    return next
}

const jump = (project, amount) => {
    const current = jumpIncomplete(project, amount)
    if (current === undefined) {
        return
    }
    store.commit('currentStory', current)
    console.log('Story is now....')
    console.log(store.state.session.story.title)
    console.log(store.state.session.story)
    return current
}

const comp = {
    name: 'refine',
    beforeCreate: function() {
        check()
        comp.methods.startIncomplete(store.state.session.project)
    },
    template,
    data: function() {
        return {
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
                .then(() => this.startIncomplete(prj))
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
        lastIncomplete: function(project) {
            return jump(project, -1)
        },
        nextIncomplete: function(project) {
            return jump(project, 1)
        },
        todo: function(project) {
            const states = this.backlogState(project)
            return states.incomplete.length
        },
        backlogState: function(project) {
            const stories = project.stories.map((story, i) => {
                story.index = i
                if (story.tasks === undefined) {
                    story.tasks = []
                }
                return story
            })
            const incomplete = stories.filter(story => incompleteFilter(story))
            const complete = stories.filter(story => completeFilter(story))
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

Vue.component('refine', comp)

export default comp
