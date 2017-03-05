// import store from '../../store.js'
import Vue from 'vue'
import template from './desc.html'

const comp = {
   name: 'storyDesc',
   template,
   data: function() {
      return {
         title: '',
         descAs: '',
         descWant: '',
         descThat: ''
      }
   }
}
Vue.component('storyDesc', comp)
export default comp
