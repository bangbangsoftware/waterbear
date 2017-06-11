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
      }).sort((a, b) => a.weight - b.weight)
   },
   useSkill: (teamSkill, skill, hours) => {
      let taken = false
      let timeLeft = hours
      const newTeamSkill = teamSkill.map(member => {
         if (member.skills.indexOf(skill) === -1) {
            return member // Doesn't have the skill
         }
         if (member.hours === 0) {
            return member // Doesn't have the time
         }
         taken = true

         if (member.hours >= timeLeft) {
            member.hours = member.hours - timeLeft
            timeLeft = 0
         } else {
            timeLeft = timeLeft - member.hours
            member.hours = 0
         }
         member.weight = service.getWeight(member)
         return member
      }).sort((a, b) => a.weight - b.weight)

      // If no skill / time in team.... it should just fail, right?
      //      if (!taken) {
      //         newTeamSkill[0].hours = newTeamSkill[0].hours - hours
      //         newTeamSkill[0].weight = service.getWeight(newTeamSkill[0])
      //      }
      return {
         skills: newTeamSkill,
         failed: !taken
      }
   },
   skillBalance: (members, startDate, endDate, sprint) => {
      let teamSkills = service.getTeamSkills(members, startDate, endDate)
      const skillHours = service.sprintSkills(sprint)
      const skills = Object.keys(skillHours)
      const failed = []
      skills.forEach(skill => {
         const result = service.useSkill(teamSkills, skill, skillHours[skill])
         if (result.failed) {
            failed.push({
               skill,
               hours: skillHours[skill]
            })
         } else {
            teamSkills = result.skills
         }
      })
      return {
         teamSkills,
         failed
      }
   }
}

export default service
