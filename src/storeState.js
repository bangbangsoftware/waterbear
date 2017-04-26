import defaults from './defaults.js'

const story = {
   title: '',
   descAs: '',
   descWant: '',
   descThat: '',
   tags: [],
   colourNo: 6,
   acs: [],
   valid: false
}

const session = {
   loaded: false,
   story: {},
   task: {},
   menu: false,
   error: '',
   currentStory: -1,
   project: {
      stories: [],
      members: [],
      defaults: [],
      owner: {}
   },
   user: {
      days: []
   },
   couchURL: 'http://localhost:5984/'
}

const signup = {
   stages: []
}

export default {
   feeds: [],
   db: null,
   members: [],
   story,
   signup,
   session,
   defaults
}
