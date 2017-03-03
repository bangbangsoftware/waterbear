import Vue from 'vue'
//import signup from 'src/components/signup/signup'
import signup from 'src/components/signup/signup.vue'

describe('signup.vue', () => {
   it('should render correct contents', () => {
      const Constructor = Vue.extend(signup)
      const vm = new Constructor().$mount()
      console.log(vm.methods)
      expect(vm.$el.querySelector('.md-title h1').textContent)
         .to.equal('Quick Start Up')
   })
})
