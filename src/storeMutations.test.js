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
