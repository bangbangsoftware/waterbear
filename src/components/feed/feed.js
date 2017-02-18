import store from '../../store.js'
import template from './feed.html'
import Vue from 'vue'

const feedComp = {
  name: 'feed',
  template,
  data () {
    return {
      feeds: store.state.feeds
    }
  },
  methods: {
    next: () => {
      console.log('going up ' + store.state.count)
      store.commit('increment')
    },
    down: event => {
      console.log('going down ' + store.state.count)
      store.commit('decrement')
    }

  }
}

Vue.component('feed', feedComp)
