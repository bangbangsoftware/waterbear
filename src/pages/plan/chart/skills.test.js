import service from './skills.js'

it('Should be able to get all skills totals from all tasks in all stories in a sprint', () => {
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

   const skills = service.sprintSkills(sprint)

   const keys = Object.keys(skills)
   expect(keys.length).toBe(4)
   expect(skills['UX']).toBe(8)
   expect(skills['None']).toBe(4)
   expect(skills['Java']).toBe(2)
   expect(skills['Javascript']).toBe(1)
})

import defaults from '../../member/hours/default.js'
it('Should be able to get get availability for a team member', () => {

   const member = {
      name: 'Cory',
      days: defaults(),
      skills: ['vuejs', 'couchdb', 'css']
   }

   const startDate = new Date(2017, 5, 11) // which is actually June
   const endDate = new Date(2017, 5, 17)

   const hours = service.getAvailability(member, startDate, endDate)
   expect(hours).toBe(5 * 8)
})

it('Should be able to get skills totals for a hours', () => {

   const member = {
      name: 'Cory',
      days: defaults(),
      skills: ['vuejs', 'couchdb', 'css']
   }
   const skillHours = service.getSkillHours(member, 40)
   expect(skillHours.hours).toBe(40)
   expect(skillHours.skills[0]).toBe('vuejs')
   expect(skillHours.skills[1]).toBe('couchdb')
   expect(skillHours.skills[2]).toBe('css')
})

it('should be able to give a weight based on skill hours', () => {
   const skillHours = {
      hours: 40,
      skills: ['vuejs', 'couchdb', 'css']
   }
   expect(service.getWeight(skillHours)).toBe(120)
})

it('should be able to give a team skills', () => {
   const members = []
   members.push({
      name: 'Cory',
      days: defaults(),
      skills: ['vuejs', 'couchdb']
   })
   members.push({
      name: 'Finn',
      days: defaults(),
      skills: ['vuejs', 'couchdb', 'css']
   })
   members.push({
      name: 'Mick',
      days: defaults(),
      skills: ['wasm']
   })
   const startDate = new Date(2017, 5, 11) // which is actually June
   const endDate = new Date(2017, 5, 17)

   const teamSkills = service.getTeamSkills(members, startDate, endDate)
   expect(teamSkills.length).toBe(3)

   expect(teamSkills[0].hours).toBe(40)
   expect(teamSkills[1].hours).toBe(40)
   expect(teamSkills[2].hours).toBe(40)

   expect(teamSkills[0].weight).toBe(40)
   expect(teamSkills[1].weight).toBe(80)
   expect(teamSkills[2].weight).toBe(120)

   expect(teamSkills[0].skills.length).toBe(1)
   expect(teamSkills[1].skills.length).toBe(2)
   expect(teamSkills[2].skills.length).toBe(3)
})

it('should be able to use a teams skill time', () => {
   const members = []
   members.push({
      name: 'Cory',
      days: defaults(),
      skills: ['vuejs', 'couchdb']
   })
   members.push({
      name: 'Finn',
      days: defaults(),
      skills: ['vuejs', 'couchdb', 'css']
   })
   members.push({
      name: 'Mick',
      days: defaults(),
      skills: ['wasm']
   })
   const startDate = new Date(2017, 5, 11) // which is actually June
   const endDate = new Date(2017, 5, 17)
   const teamSkills = service.getTeamSkills(members, startDate, endDate)

   const result = service.useSkill(teamSkills, 'vuejs', 1);
   expect(result.failed).toBe(false)
   expect(result.skills[1].hours).toBe(39)

   const result2 = service.useSkill(teamSkills, 'BANG', 1);
   expect(result2.failed).toBe(true)
})

it('should be able to balance teams skill with sprints need', () => {
   const task1 = {
      name: 'Front end dev',
      est: 35,
      skill: 'vuejs'
   }
   const task2 = {
      name: 'Backend dev',
      est: 2,
      skill: 'couchdb'
   }
   const task3 = {
      name: 'Design stuff',
      est: 3,
      skill: 'css'
   }
   const task4 = {
      name: 'Document',
      est: 4,
      skill: 'Skydiving'
   }
   const task5 = {
      name: 'Design stuff',
      est: 5,
      skill: 'css'
   }
   const task6 = {
      name: 'Front end dev',
      est: 32,
      skill: 'vuejs'
   }

   const story1 = {
      tasks: [task2, task3, task4, task6]
   }

   const story2 = {
      tasks: [task1, task5]
   }

   const sprint = {
      list: [story1, story2]
   }
   const members = []
   members.push({
      name: 'Cory',
      days: defaults(),
      skills: ['vuejs', 'couchdb']
   })
   members.push({
      name: 'Finn',
      days: defaults(),
      skills: ['vuejs', 'couchdb', 'css']
   })
   members.push({
      name: 'Mick',
      days: defaults(),
      skills: ['wasm']
   })
   const startDate = new Date(2017, 5, 11) // which is actually June
   const endDate = new Date(2017, 5, 17)
   const results = service.skillBalance(members, startDate, endDate, sprint)

   expect(results.failed.length).toBe(1)
   expect(results.failed[0].skill).toBe('Skydiving')
   expect(results.failed[0].hours).toBe(4)
   expect(results.teamSkills[0].hours).toBe(0)
   expect(results.teamSkills[1].hours).toBe(3)
   expect(results.teamSkills[2].hours).toBe(40)
   console.log(results.teamSkills)
   console.log(results.failed)

})
