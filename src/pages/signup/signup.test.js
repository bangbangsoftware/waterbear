// import Vue from 'vue'
import signup from "./signup.js";
// import signup from 'src/pages/signup/signup.vue'

describe("signup.vue", () => {
  /*
    it('should render correct contents', () => {
       const Constructor = Vue.extend(signup)
       const vm = new Constructor().$mount()
       console.log(vm.$element)
       expect(vm.$el.querySelector('.md-title h1').textContent)
          .toBe('Quick Start Up')
    })
    */
  it("should start at the start", () => {
    const data = signup.data();
    expect(data.signup.stage).toBe("start");
  });

  it("should have no errors", () => {
    const data = signup.data();
    expect(data.signup.error).toBe("");
  });

  /* taken out
      it('should have a navigate function', () => {
         const methods = signup.methods
         console.log(typeof methods.navigateTo)
         expect(typeof methods.navigateTo).toBe('function')
      })

      it('should have a navigatei function', () => {
         const methods = signup.methods
         console.log(methods.navigateTo('bang'))
         expect(typeof methods.navigateTo).toBe('function')
      })
   */
});
