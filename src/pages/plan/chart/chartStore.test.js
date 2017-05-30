import store from './chartStore.js'

test('That all the skills in all the tasks for all the stories', () => {
   const task1 = {
      name: 'Front end dev',
      est: 1,
      skill: 'Javascript'
   }
   const task2 = {
      name: 'Backend dev',
      est: 2,
      skill: 'Java'
   }
   const task3 = {
      name: 'Design stuff',
      est: 3,
      skill: 'UX'
   }
   const task4 = {
      name: 'Document',
      est: 4,
      skill: 'None'
   }
   const task5 = {
      name: 'Design stuff',
      est: 5,
      skill: 'UX'
   }

   const story1 = {
      tasks: [task2, task3, task4]
   }

   const story2 = {
      tasks: [task1, task5]
   }

   const sprint = {
      list: [story1, story2]
   }

   const state = {
      session: {
         project: {
            sprints: [sprint]
         },
         sprintIndex: 0
      }
   }

   store.sprintSkills(state)
   const skills = state.session.skills     
   const keys = Object.keys(skills)
   expect(keys.length).toBe(4)
   expect(skills['UX']).toBe(8)
   expect(skills['None']).toBe(4)
   expect(skills['Java']).toBe(2)
   expect(skills['Javascript']).toBe(1)

})
