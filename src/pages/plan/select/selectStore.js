import validSprint from './valid.js'
import store from '../../../store.js'

export default {
    selectSprint: (state, i) => {
        state.session.sprintIndex = i
    },
    sprintName: (state, newState) => {
        state.session.sprint.name = newState
        validSprint(state.session.sprint)
    },
    sprintDays: (state, newState) => {
        state.session.sprint.days = newState
        validSprint(state.session.sprint)
    },
    sprintError: (state, message) => {
        state.session.sprint.error = message
        state.session.sprint.valid = false
    },
    sprintOk: (state) => {
        state.session.sprint.error = ''
        state.session.sprint.valid = true
    },
    postSprint: (state, sprint) => {
        if (!state.session.project.sprints) {
            state.session.project.sprints = []
        }
        state.session.project.sprints.push(sprint)
    },
    takeFromSprint: (state, index) => {
        let sprint = state.session.project.sprints[state.session.sprintIndex]
        const story = sprint.list.splice(index, 1)[0]
        story.index = -1
        state.session.project.stories.push(story)
        state.session.project.sprints[state.session.sprintIndex] = sprint
        store.commit('log', 'Task removed from "' + sprint.name + '" sprint."')
    }

}
