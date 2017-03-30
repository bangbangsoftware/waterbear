import store from './store.js'
import db from './dbase.js'

import resolveUser from './direct.js'

const runaway = (reject, message) => {
   store.commit('error', 'Need to login')
   if (window) {
      window.location.href = '#/'
   }
   reject(message)
}

const noDatabase = (resolve, reject) => {
   console.error('No database')
   store.commit('user', false)
   db.getSession().then(session => {
         if (!session) {
            reject('No Session')
            return
         }
         const me = session.userCtx
         if (me.name) {
            console.log('Back from the session you are...')
            console.log(me)
            resolveUser(me).then(ok => {
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
   return new Promise((resolve, reject) => {
      if (store.state.db === null) {
         noDatabase(resolve, reject)
      } else {
         store.commit('error', '')
         resolve(true)
         return
      }
   })
}
export default service
