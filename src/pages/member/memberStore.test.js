import memberStore from './memberStore.js'

test('That nick name can be stored', () => {
   const state = {
      session: {
         user: {}
      }
   }
   memberStore.nick(state, 'fred')
   expect(state.session.user.nick).toBe('fred')
})

test('Should be able to toggle night', () => {
   const state = {
      session: {
         user: {
            days: [{
               night: [{
                  on: false
               }]
            }]
         }
      }
   }
   const time = {
      day: 0,
      hour: 0
   }
   memberStore.toggleNight(state, time)
   expect(state.session.user.days[0].night[0].on).toBe(true)
})

test('Should be able to toggle day', () => {
   const state = {
      session: {
         user: {
            days: [{
               day: [{
                  on: false
               }]
            }]
         }
      }
   }
   const time = {
      day: 0,
      hour: 0
   }
   memberStore.toggleDay(state, time)
   expect(state.session.user.days[0].day[0].on).toBe(true)
})

test('Should be able to add an array of hours', () => {
   const state = {
      session: {
         user: {}
      }
   }
   memberStore.day(state, {
      day: [{
         on: true
      }]
   })
   expect(state.session.user.days[0].day[0].on).toBe(true)
})

test('Should be able to add a member', () => {
   const state = {
      members: []
   }
   memberStore.addMember(state, 'fred')
   expect(state.members[0]).toBe('fred')
})