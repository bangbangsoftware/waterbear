import store from './store.js'
import db from './dbase.js'

const service = () => {
   const runaway = () => {
      store.commit('error', 'Need to login')
      if (window) {
         window.location.href = '#/'
      }
   }
   if (store.state.db === null) {
      console.error('No database')
      store.commit('user', false)
      db.getSession().then(session => {
            if (session) {
               const me = session.userCtx
               console.log('There you are...')
               console.log(me)
               store.commit('user', me)
               store.commit('log', me.name + ' logged on')
               store.commit('db', db)
               return true
            }
            console.error('There is no me')
            runaway()
            return false
         }).catch(err => {
            console.error(err)
            runaway()
            return false
         })
         //, no logon, redirect to login')
      return false
   } else {
      store.commit('error', '')
      return true
   }
}

export default service
