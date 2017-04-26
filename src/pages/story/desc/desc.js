import store from '../../../store.js'
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
   },
   methods: {
      storeTitle: (title) => {
         store.commit('title', title)
      },
      storeDesc: (as, want, that) => {
         if (typeof as === 'undefined') {
            as = ''
         }
         if (typeof want === 'undefined') {
            want = ''
         }
         if (typeof that === 'undefined') {
            that = ''
         }
         const desc = {
            as,
            want,
            that
         }
         store.commit('desc', desc)
      }
   }
}
Vue.component('storyDesc', comp)
export default comp
