import gotoNext from './direct.js'
import db from './dbase.js'

const service = {

   signup: (email, pw) => {

   },
   update: (user) => {

   },
   login: (email, pw) => {
      return new Promise((resolve, reject) => {
         console.log('About to logout then in')
         db.logout()
            .then(db.login(email, pw))
            .catch(err => reject(err))
            .then(me => gotoNext({
               name: email
            }))
            .catch(err => reject(err))
            .then(here => resolve(here))
            .catch(err => reject(err))
      })
   }
}

export default service
