import template from './project.html'
import store from '../../../store.js'
import Vue from 'vue'

const comp = {
   name: 'project',
   template,
   data() {
      return {
         projectName: '',
         error: ''
      }
   },
   mounted: () => {
      const element = document.getElementById('projectName')
      element.focus()
   },
   methods: {
      oops: (err, name) => {
         console.error(err)
         if (err.status === 409) {
            const nameElement = document.getElementById('projectName')
            nameElement.focus()
            this.error = name + ' is already in use'
         } else {
            const nameElement = document.getElementById('projectName')
            nameElement.focus()
            this.error = err.error + ' ' + err.reason + ' (' + err.status + ')'
         }
         store.commit('error', this.error)
         return this.error
      },
      project: (name) => {
         if (name.length === 0) {
            const element = document.getElementById('projectName')
            element.focus()
            return 'Missing project name'
         }
         const project = {
            '_id': name
         }
         store.state.db.put(project)
            .then((proj) => {
               console.log('user....')
               const user = store.state.session.user
               console.log(user)
               const meta = {
                  metadata: {
                     birthday: '',
                     skills: [],
                     aspirations: [],
                     currentProject: name
                  }
               }
               store.state.db.putUser(user.name, meta)
                  .catch(err => comp.methods.oops(err, name))

               store.commit('project', proj)
               store.commit('log', name + ' project has begun')
               store.commit('stage', {
                  name
               })
            }).catch(err => comp.methods.oops(err, name))
         return ''
      }
   }
}
Vue.component('project', comp)
