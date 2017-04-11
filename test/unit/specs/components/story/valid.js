import store from '../../store.js'

const service = (story) => {
   if (story.title.length === 0) {
      store.commit('storyError', 'invalid story - missing title')
      return false
   }

   if (story.desc.length === 0) {
      store.commit('storyError', 'invalid story - missing description')
      return false
   }

   if (story.acs.length === 0) {
      store.commit('storyError', 'invalid story - missing acceptance critera')
      return false
   }
   store.commit('storyOk')
   return true
}

export default service
