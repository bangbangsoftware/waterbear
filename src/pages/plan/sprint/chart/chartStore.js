import service from './skills.js'

export default {
   sprintSkills: (state) => {
      const sprint = state.session.project.sprints[state.session.sprintIndex]
      if (!state.session.skills) {
         state.session.skills = {}
      }
      state.session.skills.sprint = service.sprintSkills(sprint)
   },
   memberSkills: (state, startDate, endDate) => {
      if (!state.session.skills) {
         state.session.skills = {}
      }
      const members = service.memberSkills(startDate, endDate, members)
      state.session.skills.members = members
   },
   planChart: (state, both) => {
      state.session.planData = both
   }
}
