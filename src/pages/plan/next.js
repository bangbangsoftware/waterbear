export default (session) => {
   console.log('Next in plan for project...')
   console.log(session.project)
   if (!session.project.sprints || session.project.sprints.length < 1) {
      return 'sprintCreate'
   } else if (session.sprintIndex === -1) {
      return 'sprintSelect'
   } else {
      return 'sprint'
   }
}
