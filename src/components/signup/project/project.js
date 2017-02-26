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
      project: (name) => {
         if (name.length === 0) {
            const element = document.getElementById('projectName')
            element.focus()
            return 'Missing project name'
         }
         store.commit('log', name + ' project has begun')
         store.commit('stage', {
            name
         })
         return ''
      }
   }
}
Vue.component('project', comp)
