import store from '../../store.js'

const service = (state) => {
   if (state.story.title.length === 0) {
      store.commit('storyError', 'invalid story - missing title')
      return false
   }

   if (state.story.desc.length === 0) {
      store.commit('storyError', 'invalid story - missing description')
      return false
   }

   if (state.story.acs.length === 0) {
      store.commit('storyError', 'invalid story - missing acceptance critera')
      return false
   }
   store.commit('storyOk')
   return true
}

export default service
