import store from '../../store.js'
import template from './feed.html'
import Vue from 'vue'

const zeroFill = val => {
  if (val < 10) {
    return '0' + val
  } else {
    return val
  }
}

const feedComp = {
  name: 'feed',
  template,
  data: () => {
    return {
      feeds: store.state.feeds
    }
  },
  filters: {
    time: date => {
      return zeroFill(date.getHours()) +
        ':' +
        zeroFill(date.getMinutes()) +
        ':' +
        zeroFill(date.getSeconds())
    }
  }
}

Vue.component('feed', feedComp)
export default feedComp
