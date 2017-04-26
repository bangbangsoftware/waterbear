export default {
   nick: (state, name) => {
      state.session.user.nick = name
   },
   toggleNight: (state, time) => {
      const now = state.session.user.days[time.day].night[time.hour].on
      state.session.user.days[time.day].night[time.hour].on = !now
   },
   toggleDay: (state, time) => {
      const hour = state.session.user.days[time.day].day[time.hour]
      hour.on = !hour.on
      state.session.user.days[time.day].day[time.hour] = hour
      state.session.change = time
      return hour
   },
   day: (state, hours) => {
      if (!state.session.user.days) {
         state.session.user.days = []
      }
      state.session.user.days.push(hours)
   },
   addMember: (state, member) => {
      state.members.push(member)
   }
}
