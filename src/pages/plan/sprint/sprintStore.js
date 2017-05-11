import validSprint from './valid.js'

export default {
   sprintName: (state, newState) => {
      state.session.sprint.name = newState
      validSprint(state.session.sprint)
   },
   sprintFrom: (state, newState) => {
      state.session.sprint.from = newState
      validSprint(state.session.sprint)
   },
   sprintTo: (state, newState) => {
      state.session.sprint.to = newState
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
   }
}
