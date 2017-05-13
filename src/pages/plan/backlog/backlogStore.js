import store from '../../../store.js'

export default {
   addToSprint: (state, index) => {
      let sprint = state.session.project.sprints[state.session.sprintIndex]
      const story = state.session.project.stories.splice(index, 1)[0]
      if (!sprint) {
         sprint = {
            name: 'unnamed',
            list: []
         }
      }
      if (!sprint.list) {
         sprint.list = []
      }
      sprint.list.push(story)
      state.session.project.sprints[state.session.sprintIndex] = sprint
      store.commit('log', 'Added a task to  "' + sprint.name + '" sprint."')
   }
}
