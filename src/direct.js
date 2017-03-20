import router from './router/index.js'

const service = (me) => {
   let rtn = 'story'
   try {
      console.log('HOW DO I direct the route????')
      console.log(router)
      console.log(me)
      if (window) {
         if (typeof me.hours === 'undefined' || me.hours.length === 0) {
            window.location.href = '#/member'
            rtn = 'member'
         } else {
            window.location.href = '#/story'
         }
      }
   } catch (er) {
      console.log(er)
   }
   return rtn
}

export default service
