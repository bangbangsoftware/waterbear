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
   planState: 'sprintSelect',
   loaded: false,
   story: {},
   task: {},
   menu: false,
   error: '',
   currentStory: -1,
   sprintIndex: -1,
   sprint: {},
   sprints: [],
   project: {
      stories: [],
      members: [],
      defaults: [],
      sprints: [],
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
