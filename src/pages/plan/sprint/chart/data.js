import store from '../../../../store.js'

import skills from './skills.js'

const getBoxes = balance => {
   const what = balance.skills.map((s, i) => {
      return [{
         'value': balance.needs[i],
         'type': 'needs'
      }, {
         'value': balance.gots[i],
         'type': 'gots'
      }]
   })
   return {
      boxes: what,
      box_labels: balance.skills,
      colours: {
         failed: '#ff8257,#d2633f,#ffa994',
         new: '#40a8e5,#3d83ac,#8abde4',
         fresh: '#40e569,#3dac58,#8ae49c',
         due: '#ffae57,#d2633f,#ffcc7f',
         nill: '#929292,#818181,#b1b1b1'
      }
   }
}

const getBoth = (skills, results) => {
   const just = {}
   skills.forEach(skill => {
      just[skill] = results[skill]
   })

   const needs = Object.values(just).map(r => r.need)
   const gots = Object.values(just).map(r => r.got)
   return {
      needs,
      gots,
      skills
   }
}

const debug = (what, out) => {
   console.log('%s gots %o', what, out.gots)
   console.log('%s needs %o', what, out.needs)
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
      debug('balance', balance)
      const allSkills = Object.keys(results)
      const memberSkills = []
      allSkills.forEach(key => {
         if (sprintSkills.indexOf(key) === -1) {
            memberSkills.push(key)
         }
      })
      const spareSkills = getBoth(memberSkills, results)
      const chart = getBoxes(balance)
      debug('spare', balance)
      console.log('chart is %o', chart)
      const balanceAndSpare = {
         balance,
         chart,
         spareSkills
      }
      store.commit('planChart', balanceAndSpare)
      return balanceAndSpare
   }
}

export default comp
