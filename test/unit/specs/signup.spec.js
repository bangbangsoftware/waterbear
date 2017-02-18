import Vue from 'vue'
import signup from 'src/components/signup/signup'

describe('signup.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(signup)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.signup h1').textContent)
      .to.equal('Quick Start Up')
  })
})
