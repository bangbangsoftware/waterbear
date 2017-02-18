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
  data () {
    return {
      msg: '',
      email: '',
      pw: '',
      projectName: '',
      name: '',
      role: '',      
      team: [],
      stage: 'one' 
    }
  },
  watch: {
    email: () => {
      console.log('CHANGED...')
      this.msg = 'Here we go..'
    }
  },
  methods: {
    createUser: (stage,email,pw) => {
      if (stage === 'two'){
        db.signup(email, pw, {
          metadata : {
              email : '',
              birthday : '',
              currentProjectID: -1,
              skills: [],
              asperations: []
            }
        }, function (err, response) {
          // etc.
        });
      }      
      const log = {date:new Date(),message:email+" now has a user"}      
      store.commit('log',log);
    },
    project: (stage,name) => {
      const log = {date:new Date(),message:" "+name+" project has begun"}      
      store.commit('log',log);
    },
    owner: (stage,name,role) => {
      const log = {date:new Date(),message:name+" is the owner"}      
      store.commit('log',log);
    },
    team: (stage,team) => {
      const log = {date:new Date(),message:"Initial team has been defined"}      
      store.commit('log',log);
    }
  }
}
