import store from './backlogStore.js'

test('can add to sprint', () => {
   const state = {
      session: {
         project: {
            sprints: [],
            stories: ['This isn\'t real']
         },
         sprintIndex: 1
      }
   }
   store.addToSprint(state, 0)
   expect(state.session.project.sprints[state.session.sprintIndex].list[0]).toBe('This isn\'t real')

})
