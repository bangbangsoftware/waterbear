const getDates = (startDate, stopDate) => {
   const dateArray = []
   let currentDate = startDate
   while (currentDate <= stopDate) {
      dateArray.push(currentDate)
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
   }
   return dateArray
}

const getDayHours = (date, member) => {
   const index = date.getDay()
   const fullday = member.days[index]
   const dayHours = fullday.day.filter(hour => hour.on).length
   const nightHours = fullday.night.filter(hour => hour.on).length
   return dayHours + nightHours
}

const service = {
   sprintSkills: (sprint) => {
      const stories = sprint.list
      const tasks = []
      stories.forEach(story => {
         const newTasks = story.tasks
         tasks.push.apply(tasks, newTasks)
      })
      const skillMap = {}
      tasks.filter(task => typeof task !== 'undefined')
         .forEach(task => {
            let qty = skillMap[task.skill]
            if (typeof qty === 'undefined' || qty === -1) {
               qty = 0
            }
            qty = qty + task.est
            skillMap[task.skill] = qty
         })

      return skillMap
   },
   getAvailability: (member, startDate, endDate) => {
      // what day is the start Day
      // for owner and members how many skill/hours
      // skillMap[skill] = qty
      if (startDate >= endDate) {
         console.error('start after end???: ' + startDate + ' > ' + endDate)
         return 0
      }
      const dates = getDates(startDate, endDate)
      const total = dates.map(date => getDayHours(date, member))
         .reduce((prev, hours) => hours + prev)

      return total
   },
   getSkillHours: (member, hours) => {
      return {
         hours,
         skills: member.skills
      }
   },
   getWeight: skillHours => {
      return skillHours.hours * skillHours.skills.length
   },
   getTeamSkills: (members, startDate, endDate) => {
      return members.map(member => {
         const start = new Date(startDate)
         const end = new Date(endDate)
         const hours = service.getAvailability(member, start, end)
         const skillHours = service.getSkillHours(member, hours)
         const weight = service.getWeight(skillHours)
         return {
            hours,
            skills: skillHours.skills,
            weight
         }
      })
   },
   getSkillBalance: (members, startDate, endDate, sprint) => {
      const teamSkills = service.getTeamSkills(members, startDate, endDate)
      const skills = service.sprintSkills(sprint)
      const relevant = teamSkills.filter(ts => skills.indexOf(ts.skills) > -1)
      const keys = Object.keys(skills)

   }
}

export default service
