import validTask from './valid.js'

export default {
   taskError: (state, message) => {
      state.session.task.error = message
      state.session.task.valid = false
   },
   taskOk: (state) => {
      state.session.task.error = ''
      state.session.task.valid = true
   },
   clearTask: (state) => {
      state.session.task = {
         error: '',
         name: '',
         desc: '',
         est: 0,
         valid: false
      }
   },
   taskName: (state, name) => {
      state.session.task.name = name
      validTask(state.session.task)
   },
   taskDesc: (state, desc) => {
      state.session.task.desc = desc
      validTask(state.session.task)
   },
   taskEst: (state, est) => {
      state.session.task.est = est
      validTask(state.session.task)
   },
   postTask: (state, task) => {

   }
}
