export default {
   sprintSkills: (state) => {
      const sprint = state.session.project.sprints[state.session.sprintIndex]
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

      state.session.skills = skillMap
   }
}
