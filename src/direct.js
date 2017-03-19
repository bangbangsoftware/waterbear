import router from './router/index.js'

const service = (me) => {
   try {
      console.log('HOW DO I direct the route????')
      console.log(router)
      if (typeof me.hours === 'undefined' || me.hours.length === 0) {
         window.location.href = '#/member'
      } else {
         window.location.href = '#/story'
      }
   } catch (er) {
      console.log(er)
   }
}

export default service
