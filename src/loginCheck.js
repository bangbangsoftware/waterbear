import store from './store.js'
import db from './dbase.js'

import resolveUser from './direct.js'

const runaway = (reject, message) => {
   store.commit('loaded', false)
   store.commit('error', 'Need to login')
   if (window) {
      window.location.href = '#/'
   }
   store.commit('loaded', true)
   reject(message)
}

const noDatabase = (resolve, reject) => {
   console.error('No database')
   store.commit('user', false)
   db.getSession().then(session => {
      if (!session) {
         runaway(reject, 'No Session')
         return
      }
      const me = session.userCtx
      if (me.name) {
         console.log('Back from the session you are...')
         console.log(me)
         resolveUser(me).then(ok => {
            store.commit('loaded', true)
            resolve(me)
         }).catch(err => {
            runaway(err, err)
         })
      } else {
         runaway(reject, 'There is no me')
      }
   }).catch(err => runaway(err, err))
}

const service = () => {
   store.commit('loaded', false)
   return new Promise((resolve, reject) => {
      if (store.state.db === null) {
         noDatabase(resolve, reject)
      } else {
         store.commit('error', '')
         store.commit('loaded', true)
         resolve(true)
         return
      }
   })
}
export default service
