import store from '../../../store.js'

const service = sprint => {
   if (!sprint.name || sprint.name.length === 0) {
      store.commit('sprintError', 'invalid sprint - missing name')
      return false
   }

   if (!sprint.days || sprint.days.length === 0 || sprint.days > 0) {
      store.commit('sprintError', 'invalid sprint - missing sprint length')
      return false
   }

   store.commit('sprintOk')
   return true
}

export default service
