import template from './project.html'
import store from '../../../store.js'
import user from '../../../user.js'
import Vue from 'vue'

const register = proj => {
   console.log('user....')
   user.currentProject(store.state.session.user, proj.id)
   store.commit('project', proj)
   store.commit('log', proj.id + ' project has begun')
   store.commit('stage', {
      name: proj.id
   })
}

const oops = (err, name) => {
   console.error(err)
   const nameElement = document.getElementById('projectName')
   nameElement.focus()
   let error = err.error + ' ' + err.reason + ' (' + err.status + ')'
   if (err.status === 409) {
      error = name + ' is already in use'
   } else if (err.status === 404) {
      error = 'couchDB (' + store.state.session.couchURL + ') has no "waterbear" databse'
   }
   store.commit('error', error)
   return error
}

const comp = {
   name: 'project',
   template,
   data() {
      return {
         projectName: '',
         error: '',
         session: store.state.session
      }
   },
   mounted: () => {
      store.commit('error', '')
      const element = document.getElementById('projectName')
      element.focus()
   },
   methods: {
      project: (name, desc) => {
         if (name.length === 0) {
            const element = document.getElementById('projectName')
            element.focus()
            return 'Missing project name'
         }
         if (desc.length === 0) {
            const element = document.getElementById('projectDesc')
            element.focus()
            return 'Missing project description'
         }
         const project = {
            '_id': name,
            'description': desc
         }
         store.state.db.put(project)
            .then(prj => register(prj))
            .catch(err => oops(err, name))
         return ''
      }
   }
}
Vue.component('project', comp)
export default comp
