import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    feeds: []
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    log: (state, item) => state.feeds.push(item)
  }
})

export default store
