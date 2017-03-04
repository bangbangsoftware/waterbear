// import store from '../../store.js'
// import Vue from 'vue'

export default {
   name: 'story',
   data: function() {
      return {
      }
   },
   methods: {
      navigateTo: function(nav) {
         this.$router.go({
            path: nav
         })
      }
   }
}
