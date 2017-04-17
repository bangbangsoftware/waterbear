import store from '../../store.js'

import './start/start'
import './project/project'
import './summary/summary'
import './owner/owner'
import './team/team'

export default {
   name: 'signup',
   data: function() {
      return {
         stages: store.state.signup.stages,
         signup: {
            error: '',
            stage: 'start'
         }
      }
   }
}
