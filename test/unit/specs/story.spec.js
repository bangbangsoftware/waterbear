import story from 'src/components/story/story'
import store from 'src/store.js'

describe('story.vue', () => {
   beforeEach(() => {
      // store setup
      const project = {
         _id: 'faker',
         stories: []
      }
      store.commit('project', project)
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
      story.methods.postStory()
      expect(store.state.session.project.stories.length).to.equal(0)
   })

   it('should NOT add an invalid story with one field filled in', () => {
      store.commit('title', 'tester')
      story.methods.postStory()
      expect(store.state.session.project.stories.length).to.equal(0)
   })

   it('should NOT add an invalid story with two field filled in', () => {
      store.commit('desc', 'tesc desc')
      story.methods.postStory()
      expect(store.state.session.project.stories.length).to.equal(0)
   })

   it('should add a valid story', () => {
      var crit = {}
      store.commit('acceptance', crit)
      story.methods.postStory()
      expect(store.state.session.project.stories.length).to.equal(1)
   })
})
