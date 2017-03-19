import store from './store.js'

const service = () => {
   if (store.state.db === null) {
      console.error('No database, no logon, redirect to login')
      window.location.href = '#/'
   } else {
      store.commit('error', '')
   }
}

export default service
