import store from './planStore.js'

test('should be able to change plan state', () => {
   const state = {
      session: {}
   };
   store.planState(state, 'BANG')
   expect(state.session.planState).toBe('BANG')
})
