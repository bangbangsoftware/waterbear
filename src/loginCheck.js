import store from './store.js'

const service = () => {
   if (store.state.db === null) {
      console.error('No database, no logon, redirect to login')
      store.commit('error', 'Need to login')
      if (window) {
         window.location.href = '#/'
      }
      return false
   } else {
      store.commit('error', '')
      return true
   }
}

export default service
