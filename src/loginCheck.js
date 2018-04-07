import store from './store.js'
import db from './dbase.js'

import resolveUser from './direct.js'

const runaway = (jump, reject) => (reject, message) => {
    store.commit('loaded', false)
    store.commit('error', 'Need to login')
    if (window && jump) {
        window.location.href = '#/'
    }
    //   store.commit('loaded', true)
    reject(message)
}

const checkSession = error => (session, resolve) => {
    if (!session) {
        error('No Session')
        return
    }
    const me = session.userCtx
    if (!me.name) {
        error('There is no me')
        return
    }
    console.log('Back from the session you are...')
    console.log(me)
    resolveUser(me).then(ok => {
        store.commit('loaded', true)
        resolve(me)
    }).catch(err => {
        error(err)
    })
}

const noDatabase = (resolve, reject, checker) => {
    console.error('No database')
    store.commit('user', false)
    db.getSession().then(session => checker(session))
        .catch(err => runaway(reject, err))
}

const service = function(jump = true) {
    store.commit('loaded', false)
    return new Promise((resolve, reject) => {
        const error = runaway(jump, reject)
        const checker = checkSession(error)
        if (store.state.db === null) {
            noDatabase(resolve, reject, checker)
        } else {
            store.commit('error', '')
            store.commit('loaded', true)
            resolve(true)
            return
        }
    })
}
export default service
