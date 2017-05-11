import store from '../../../store.js'

const service = sprint => {
   if (!sprint.name || sprint.name.length === 0) {
      store.commit('sprintError', 'invalid sprint - missing name')
      return false
   }

   if (!sprint.from || sprint.from.length === 0) {
      store.commit('sprintError', 'invalid sprint - missing from date and time')
      return false
   }

   if (!sprint.to || sprint.to.length === 0) {
      store.commit('sprintError', 'invalid sprint - missing to date and time')
      return false
   }

   store.commit('sprintOk')
   return true
}

export default service
