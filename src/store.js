import Vuex from 'vuex'
import Vue from 'vue'

import mutations from './storeMutations.js'
import taskMutations from './pages/plan/task/taskStore.js'
import memberMutations from './pages/member/memberStore.js'
import storyMutations from './pages/story/storyStore.js'

import state from './storeState.js'

Vue.use(Vuex)

const addToMutations = newMutes => {
   for (let key in newMutes) {
      mutations[key] = newMutes[key]
   }
}
addToMutations(memberMutations)
addToMutations(storyMutations)
addToMutations(taskMutations)

export default new Vuex.Store({
   state,
   mutations
})
