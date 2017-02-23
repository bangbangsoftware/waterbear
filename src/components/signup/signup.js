import store from '../../store.js'
import defaults from '../../defaults.js'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'font-awesome/css/font-awesome.css'

import Password from 'vue-password-strength-meter'

import Create from './user/create.js'

Vue.use(VueMaterial)

const name = 'waterbear'
const error = err => console.error(err);
const remoteCoach = 'http://localhost:5984/' + name
const pouchOpts = {
   skipSetup: true,
   live: true
}
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))

const db = new PouchDB(remoteCoach, pouchOpts, error)

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
            error: '',
            members: []     
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
            error: ''
         };
      },
      addmember: (name,role,email,state) =>{
         state.members.push[{name,role,email}]
         return state;
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
