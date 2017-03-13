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

   it('should NOT add an invalid story', () => {
      story.methods.postStory()
      expect(store.state.session.project.stories.length).to.equal(0)
   })

   it('should NOT add an invalid story', () => {
      var err = story.methods.postStory()
      expect(err).to.equal('basho')
   })
})
