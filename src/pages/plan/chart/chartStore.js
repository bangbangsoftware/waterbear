export default {
   sprintSkills: (state) => {
      const sprint = state.session.project.sprints[state.session.sprintIndex]
      const stories = sprint.list
      const tasks = []
      stories.forEach(story => {
         const newTasks = story.tasks
         tasks.push.apply(tasks, newTasks)
      })
      const skills = tasks.filter(task => typeof task !== 'undefined')
         .map(task => task.skill)
      state.session.skills = skills
   }
}
