import store from './sprintStore.js'

it('if can be selected', () => {
   const state = {
      session: {}
   }
   store.selectSprint(state, 45)
   expect(state.session.sprintIndex).toBe(45)
})

it('Sprint can set sprint name', () => {
   const state = {
      session: {
         sprint: {}
      }
   }
   store.sprintName(state, 'Bug fix')
   expect(state.session.sprint.name).toBe('Bug fix')
})

it('can set sprint days', () => {
   const state = {
      session: {
         sprint: {
            name: 'A Sprint'
         }
      }
   }
   store.sprintDays(state, ['A Bug fix'])
   console.log(state.session.sprint)
   expect(state.session.sprint.days[0]).toBe('A Bug fix')
})

it('can set sprint days', () => {
   const state = {
      session: {
         sprint: {
         }
      }
   }
   store.sprintDays(state, ['A Bug fix'])
   console.log(state.session.sprint)
   expect(state.session.sprint.days[0]).toBe('A Bug fix')
})


it('can set sprint error', () => {
   const state = {
      session: {
         sprint: {}
      }
   }
   store.sprintError(state, 'Wrong')
   expect(state.session.sprint.error).toBe('Wrong')
   expect(state.session.sprint.valid).toBe(false)
})

it('can set sprint to be ok', () => {
   const state = {
      session: {
         sprint: {}
      }
   }
   store.sprintOk(state)
   expect(state.session.sprint.error).toBe('')
   expect(state.session.sprint.valid).toBe(true)
})

it('can post sprint', () => {
   const state = {
      session: {
         project: {}
      }
   }
   const sprint = {
      name: 'fred'
   }
   store.postSprint(state, sprint)
   expect(state.session.project.sprints[0].name).toBe('fred')
})

it('if can take from sprint', () => {
   const story = {
      name: 'fred\'s story'
   }
   const sprint = {
      name: 'fred',
      list: [story]
   }
   const state = {
      session: {
         project: {
            sprints: [sprint],
            stories: []
         },
         sprintIndex: 0
      }
   }
   store.takeFromSprint(state, 0)
   expect(state.session.project.sprints[0].list.length).toBe(0)
   expect(state.session.project.stories.length).toBe(1)
})
