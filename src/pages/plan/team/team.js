import Vue from 'vue'

import store from '../../../store.js'
import user from '../../../user.js'

import template from './team.html'

const comp = {
   name: 'time',
   template,
   beforeCreate: function() {
      this.members = store.state.session.project.members
      const owner = store.state.session.project.owner
      owner.owner = true
      this.members.push(owner)
   },
   data: () => {
      return {
         session: store.state.session,
         members: []
      }
   },
   methods: {
      save: () => {
         const session = store.state.session
         user.updateUser(session.user, session.project)
      }
   }
}

Vue.component('team-display', comp)
export default comp