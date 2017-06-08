import store from './planStore.js'

it('should be able to change plan state', () => {
   const state = {
      session: {}
   };
   store.planState(state, 'BANG')
   expect(state.session.planState).toBe('BANG')
})
