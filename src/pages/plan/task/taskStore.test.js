import store from './taskStore.js'

test('task error can be set', () => {
   const state = {
      session: {
         task: {}
      }
   }
   store.taskError(state, 'hello')
   expect(state.session.task.valid).toBe(false)
   expect(state.session.task.error).toBe('hello')
})

test('task ok can be set', () => {
   const state = {
      session: {
         task: {}
      }
   }
   store.taskOk(state)
   expect(state.session.task.valid).toBe(true)
   expect(state.session.task.error).toBe('')
})

test('task can be cleared', () => {
   const state = {
      session: {
         task: {}
      }
   }
   store.clearTask(state)
   expect(state.session.task.valid).toBe(false)
   expect(state.session.task.name).toBe('')
})

test('task name can be set', () => {
   const state = {
      session: {
         task: {}
      }
   }
   store.clearTask(state)
   store.taskName(state, 'ringo')
   expect(state.session.task.name).toBe('ringo')
})

test('task desc can be set', () => {
   const state = {
      session: {
         task: {
            name: 'ringo'
         }
      }
   }
   store.clearTask(state)
   state.session.task.name = 'ringo'

   store.taskDesc(state, 'blar')
   expect(state.session.task.desc).toBe('blar')
})

test('task desc can be set', () => {
   const state = {
      session: {
         task: {
            name: 'ringo'
         }
      }
   }
   store.clearTask(state)

   store.taskDesc(state, 'blar')
   expect(state.session.task.desc).toBe('blar')
})


test('task skill can be set', () => {
   const state = {
      session: {
         task: {}
      }
   }
   store.clearTask(state)
   state.session.task.name = 'ringo'
   state.session.task.desc = 'blar'

   store.taskSkill(state, 'running')
   expect(state.session.task.skill).toBe('running')
})

test('task est can be set', () => {
   const state = {
      session: {
         task: {}
      }
   }
   store.clearTask(state)
   state.session.task.name = 'ringo'
   state.session.task.desc = 'blar'
   state.session.task.skill = 'running'
   store.taskEst(state, 10)
   expect(state.session.task.est).toBe(10)
})

test('can select a task', () => {
   const state = {
      session: {
         task: {}
      }
   }
   store.clearTask(state)
   state.session.task.name = 'ringo'
   state.session.task.desc = 'blar'
   state.session.task.skill = 'running'
   state.session.task.est = 10

   store.selectTask(state, state.session.task)
   expect(state.session.task.name).toBe('ringo')
})

test('can add a task', () => {
    const state = {
      session: {
         task: {},
          project: {
            stories: [{
               tasks: []
            }]
         },
         story: {
            index: 0
         }
      }
   }
   store.clearTask(state)
   state.session.task.name = 'banger'
   state.session.task.desc = 'blar'
   state.session.task.skill = 'running'
   state.session.task.est = 10

   store.task(state, state.session.task)
   expect(state.session.project.stories[0].tasks[0].name).toBe('banger')
})
