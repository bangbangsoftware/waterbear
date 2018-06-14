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
    story,
    task: {},
    menu: false,
    error: '',
    currentStory: -1,
    sprint: {
        name: '',
        from: '',
        to: ''
    },
    sprints: [],
    project: {
        stories: [],
        members: [],
        defaults: [],
        sprints: [],
        current: {
            sprintIndex: -1
        }
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
    signup,
    session,
    defaults
}
