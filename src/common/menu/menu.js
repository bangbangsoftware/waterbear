import Vue from 'vue'
import store from '../../store.js'
import template from './menu.html'

import './menu.css'

const comp = {
   name: 'menu',
   template,
   data: function() {
      return {
         session: store.state.session
      }
   },
   methods: {
      go: function(where) { // !!! to use 'this', don't use => !!!!
         if (!where) {
            store.commit('loaded', false)
         }
         const that = this
         if (that.$refs) {
            that.$refs.sidenav.close()
         }
         if (window) {
            Vue.nextTick(() => {
               window.location.href = '#/' + where
            })
         }

         /**
            if (this.$router.go) {
               console.log('Going to ' + where)
               this.$router.go({
                 name: where
               })
            } else if (window) {
               window.location.href = '#/' + where
            }
            **/
      }
   }
}

Vue.component('main-menu', comp)
export default comp
