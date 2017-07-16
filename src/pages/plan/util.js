import store from '../../store.js'

import data from './sprint/chart/data.js'

export default {
   next: session => {
      console.log('Next in plan for project...')
      console.log(session.project)
      if (!session.project.sprints || session.project.sprints.length < 1) {
         return 'sprintCreate'
      } else if (session.sprintIndex === -1) {
         return 'sprintSelect'
      } else {
         return 'sprint'
      }
   },
   updateSprints: () => {
      const prj = store.state.session.project
      console.log('Adding sprint')
      console.log(prj)
      data.refresh()
      const db = store.state.db
      db.get(prj._id)
         .then(p => {
            p.sprints = store.state.session.project.sprints
            p.stories = store.state.session.project.stories
            return db.put(p)
         })
         .catch(err => console.error(err))
   },
   storeSprint: sprint => {
      const prj = store.state.session.project
      console.log('Adding sprint to project')
      console.log(prj)
      const db = store.state.db
      db.get(prj._id)
         .then(p => {
            let sprints = p.sprints
            if (!sprints) {
               sprints = []
            }
            sprints.push(sprint)
            p.sprints = sprints
            return db.put(p)
         })
         .catch(err => console.error(err))
   }
}
