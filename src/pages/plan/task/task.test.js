import comp from './task.js'
import store from '../../../store.js'

it('Can post tasks', () => {
   const mockDB = {
      get: () => Promise.resolve({
         stories: [{}]
      })
   }
   store.commit('db', mockDB)
   const task = {
      name: 'bingo',
      est: 10,
      desc: "French Disco",
      skill: 'slinking'
   }
   comp.methods.postTask(task)
   task.name = ''
   comp.methods.postTask(task)
})

it('Can post tasks', () => {
   let proj = null
   const mockDB = {
      get: () => Promise.resolve({
         stories: [{}]
      }),
      put: p => {
         proj = p
      }
   }
   store.commit('db', mockDB)
   const task = {
      name: 'bingo',
      est: 10,
      desc: "French Disco",
      skill: 'slinking'
   }
   store.commit('currentStory', {
      index: 0
   })
   const project = {
      stories: [{}],
      id: 3
   }
   comp.methods.addTask(project, task)
   expect(proj.id).toBe(3)
})

it('Can store task name', () => {
   comp.methods.storeName('bingo')
})

it('Can store task desc', () => {
   comp.methods.storeDesc('bingo')
})

it('Can store task est', () => {
   comp.methods.storeEst(10)
})

it('Can store task skill', () => {
   comp.methods.storeSkill('vue')
})
