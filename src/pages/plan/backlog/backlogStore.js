import store from '../../../store.js'

export default {
   addToSprint: (state, taskIndex) => {
      let sprint = state.session.sprints[state.session.sprintIndex]
      if (!sprint) {
         sprint = {
            name: 'unnamed',
            list: []
         }
      }
      const sprintItem = {
         storyIndex: state.session.story.index,
         taskIndex: taskIndex
      }
      sprint.list.push(sprintItem)
      state.session.sprints[state.session.sprintIndex] = sprint
      store.commit('log', 'Added a task to  "' + sprint.name + '" sprint."')
   }
}
