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

const comp = {
   refresh: (from = new Date(), to = new Date(+new Date() + 12096e5)) => {
      const project = store.state.session.project
      const sprint = project.sprints[store.state.session.sprintIndex]
      const members = project.members

      // members.push(project.owner) - Owner is already there????
      const results = skills.skillBalance(members, from, to, sprint)

      const sprintSkills = skills.sprint(sprint)
      const balance = getBoth(sprintSkills, results)
      const allSkills = Object.keys(results)
      const memberSkills = []
      allSkills.forEach(key => {
         if (sprintSkills.indexOf(key) === -1) {
            memberSkills.push(key)
         }
      })
      const spareSkills = getBoth(memberSkills, results)
      const balanceAndSpare = {
         balance,
         spareSkills
      }
      store.commit('planChart', balanceAndSpare)
      return balanceAndSpare
   }
}

export default comp
