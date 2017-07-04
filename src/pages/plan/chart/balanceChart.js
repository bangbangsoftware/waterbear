import Vue from 'vue'

import {
   Bar
} from 'vue-chartjs'

import store from 'store'

import skills from './skills.js'

const getBoth = (skills, results) => {
   const just = {}
   skills.forEach(skill => {
      just[skill] = results[skill]
   })

   const needs = Object.values(just).map(r => r.need)
   const gots = Object.values(just).map(r => r.got)
   console.log('gots', gots)
   console.log('needs', needs)
   return {
      needs,
      gots,
      skills
   }
}

const comp = Bar.extend({
   mounted() {
      const project = store.state.session.project
         // @TODO store results in store state and use in this graph
         // and spare skill graph....
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
      console.log('results', results)

      /* Don't care about all members skills just whats in the sprint */
      const sprintSkills = skills.sprint(sprint)
      const display = getBoth(sprintSkills, results)
      this.renderChart({
         labels: display.skills,
         datasets: [{
            label: 'Need',
            backgroundColor: '#f87979',
            data: display.needs
         }, {
            label: 'Got',
            backgroundColor: '#180079',
            data: display.gots
         }]
      })

      /* const allSkills = Object.keys(results)
      const memberSkills = []
      allSkills.forEach(key => {
         if (sprintSkills.indexOf(key) === -1) {
            memberSkills.push(key)
         }
      })
      const display = getBoth(memberSkills, results)
      */
   }
})

Vue.component('balanceChart', comp)
export default comp
