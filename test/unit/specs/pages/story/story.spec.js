import story from 'src/pages/story/story'
import store from 'src/store.js'

const blankStory = () => {
   const myStory = {
      title: '',
      desc: '',
      acs: []
   }
   store.commit('clearStory')
   store.commit('story', myStory)
   return myStory
}

describe('story.spec.js', () => {
   beforeEach(() => {
      // store setup
      const project = {
         _id: 'faker',
         stories: []
      }
      store.commit('project', project)
      blankStory()
      const fakeDB = {
         get: id => {
            return new Promise((resolve, reject) => {
               resolve(project)
            })
         },
         put: prj => {
            return new Promise((resolve, reject) => {
               console.log(prj)
               resolve(prj)
            })
         }
      }
      store.commit('db', fakeDB)
   })

   it('should default to invalid story ', () => {
      const data = story.data()
      expect(data.story.valid).to.equal(false)
   })

   it('should have no stories in project by default', () => {
      expect(store.state.session.project.stories.length).to.equal(0)
   })

   it('should NOT add an invalid story with no fields filled in', () => {
      var myStory = blankStory()
      story.methods.postStory(myStory)
      expect(store.state.session.project.stories.length).to.equal(0)
   })

   it('should NOT add an invalid story with one field filled in', () => {
      store.commit('title', 'tester')
      story.methods.postStory(store.state.story)
      expect(store.state.session.project.stories.length).to.equal(0)
   })

   it('should NOT add an invalid story with two field filled in', () => {
      store.commit('title', 'tester')
      store.commit('desc', 'tesc desc')
      story.methods.postStory(store.state.story)
      expect(store.state.session.project.stories.length).to.equal(0)
   })

   it('should add a valid story', () => {
      store.commit('title', 'tester')
      store.commit('desc', 'tesc desc')
      var crit = {}
      store.commit('acceptance', crit)
      story.methods.postStory(store.state.story)
      expect(store.state.session.project.stories.length).to.equal(1)
   })
})
