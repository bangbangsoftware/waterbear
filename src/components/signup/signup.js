import store from '../../store.js'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

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
  directives: {
    focus
  },
  data() {
    return {
      msg: '',
      email: '',
      pw: '',
      projectName: '',
      name: '',
      role: '',
      team: [],
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
      if (email.length === 0) {
        const emailElement = document.getElementById('email')
        emailElement.focus()
        return {
          stage: 'user',
          error: 'Missing email'
        };
      }
      if (pw.length === 0) {
        const pwElement = document.getElementById('password')
        pwElement.focus()
        return {
          stage: 'user',
          error: 'Missing password'
        };
      }
      db.signup(email, pw, {
        metadata: {
          email: '',
          birthday: '',
          currentProjectID: -1,
          skills: [],
          asperations: []
        }
      }, function(err, response) {
        // etc.
      });
      store.commit('log', email + ' is a new owner');
      Vue.nextTick(() =>{
        const element = document.getElementById('projectName')
        element.focus()
      })      
      return {
        stage: 'project',
        error: ''
      };
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
       Vue.nextTick(() =>{
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
    team: (team) => {
      const log = {
        date: new Date(),
        message: 'Initial team has been defined'
      }
      store.commit('log', projectName + " has a team of " + team.length + " members.");
    }
  }
}
