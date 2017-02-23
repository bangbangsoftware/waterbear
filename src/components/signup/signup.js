import store from '../../store.js'
import defaults from '../../defaults.js'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'font-awesome/css/font-awesome.css'

import Password from 'vue-password-strength-meter'

import Create from './user/create.js'
import Team from './project/team.js'

Vue.use(VueMaterial)

export default {
   name: 'signup',
   components: {
      Password
   },
   data() {
      return {
         msg: '',
         email: '',
         pw: '',
         projectName: '',
         name: '',
         role: '',
         ownerRole: '',
         roles: defaults.roles,
         state: {
            stage: 'user',
            error: ''
         }
      }
   },
   watch: {
      email: () => {
         console.log('CHANGED...')
         this.msg = 'Here we go..'
      }
   },
   methods: {
      createUser: (email, pw) => {
         return Create.user(email, pw)
      },
      project: (name) => {
         if (name.length === 0) {
            const element = document.getElementById('projectName')
            element.focus()
            return {
               stage: 'project',
               error: 'Missing project name'
            };
         }
         store.commit('log', name + ' project has begun');
         Vue.nextTick(() => {
            const element = document.getElementById('ownerName')
            element.focus()
         })
         return {
            stage: 'owner',
            error: ''
         };
      },
      owner: (name, role) => {
         store.commit('log', 'Hi ' + name);
         return {
            stage: 'team',
            error: '',
            members: [],
            teamName: '',
            teamRole: '',
            teamEmail: ''
         };
      },
      addMember: (name, role, email, members) => {
         return Team.addMember(name, role, email, members)
      },
      team: (team) => {
         const log = {
            date: new Date(),
            message: 'Initial team has been defined'
         }
         store.commit('log', projectName + " has a team of " + team.length + " members.");
      }
   }
}
