import store from '../../../store.js'

export default {
   addToSprint: (state, index) => {
      let sprint = state.session.sprints[state.session.sprintIndex]
      const story = state.session.project.stories.splice(index, 1)[0]
      if (!sprint) {
         sprint = {
            name: 'unnamed',
            list: []
         }
      }
      sprint.list.push(story)
      state.session.sprints[state.session.sprintIndex] = sprint
      store.commit('log', 'Added a task to  "' + sprint.name + '" sprint."')
   }
}
