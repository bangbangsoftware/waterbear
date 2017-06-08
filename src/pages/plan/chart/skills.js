export default {
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
   memberSkills: (state, startDate, endDate) => {
      // what day is the start Day
      // for owner and members how many skill/hours
      // skillMap[skill] = qty
      const index = startDate.getDay()
      console.log('Day number is ' + index)
         // {name:'fred',skills:{'vue':23.'design:33}, weight: 2X33}
         // {name:'john',skills:{'vue':3.'design:3}}
   }
}
