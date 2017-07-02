import Vue from 'vue'

import {
   Bar
} from 'vue-chartjs'

import store from 'store'

import skills from './skills.js'

const comp = Bar.extend({
   mounted() {
      const project = store.state.session.project
      console.log('The project is %o', project)
      const sprint = project.sprints[store.state.session.sprintIndex]
      const members = project.members
      // members.push(project.owner) - Owner is already there????
      const now = new Date()
      const fortnightAway = new Date(+new Date() + 12096e5)

      console.log('Members: %o', members)
      console.log('From %o to %o', now, fortnightAway)
      console.log('Sprint: %o', sprint)
      const results = skills.skillBalance(members, now, fortnightAway, sprint)

      const allSkills = Object.keys(results)
      const needs = Object.values(results).map(r => r.need)
      const gots = Object.values(results).map(r => r.got)
      console.log('results', results)
      console.log('gots', gots)
      console.log('needs', needs)
      this.renderChart({
         labels: allSkills,
         datasets: [{
            label: 'Need',
            backgroundColor: '#f87979',
            data: needs
         }, {
            label: 'Got',
            backgroundColor: '#180079',
            data: gots
         }]
      })
   }
})

Vue.component('balanceChart', comp)
export default comp
