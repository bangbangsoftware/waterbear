import mut from './storeMutations.js'

test('set loaded state', () => {
   const state = {
      session: {}
   }
   mut.loaded(state, true)
   expect(state.session.loaded).toBe(true)
})

test('Should be able to push a new stage', () => {
   const state = {
      signup: {
         stages: []
      }
   }
   mut.stage(state, 'bang')
   expect(state.signup.stages[0]).toBe('bang')
})

test('Should be able to set a database', () => {
   const state = {}
   mut.db(state, 'teeth')
   expect(state.db).toBe('teeth')
})

test('Should be able to set an error', () => {
   const state = { session: {}}
   mut.error(state, 'bad')
   expect(state.session.error).toBe('bad')
})

test('Should be able to set a project', () => {
   const state = { session: {}}
   mut.project(state, 'Waterbear')
   expect(state.session.project).toBe('Waterbear')
})

test('Should be able to set a user', () => {
   const state = { session: {}}
   mut.user(state, 'Fred')
   expect(state.session.user).toBe('Fred')
})
