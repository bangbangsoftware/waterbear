import refine from './refine'
import store from '../../store.js'

const storyOne = {
    title: 'Story number one',
    descAs: "",
    descWant: "",
    descThat: "",
    tags: [],
    colourNo: 4,
    acs: [],
    valid: true,
    error: ""
}

const storyTwo = {
    title: 'Story number two',
    descAs: "",
    descWant: "",
    descThat: "",
    tags: [],
    colourNo: 4,
    acs: [],
    valid: true,
    points: 3,
    error: ""
}

const storyThree = {
    title: 'Story number three',
    descAs: "",
    descWant: "",
    descThat: "",
    tags: [],
    colourNo: 4,
    acs: [],
    valid: true,
    error: "",
    points: 8,
    tasks: [{
        error: '',
        name: 'Do a load of vuejs',
        desc: '',
        skill: 'VueJS',
        est: 10,
        valid: false
    }]
}

const storyFour = {
    title: 'Story number four',
    descAs: "",
    descWant: "",
    descThat: "",
    tags: [],
    colourNo: 4,
    acs: [],
    valid: true,
    error: "",
    tasks: [{
        error: '',
        name: 'Do more  vuejs',
        desc: '',
        skill: 'VueJS',
        est: 20,
        valid: false
    }]
}

const storyFive = {
    title: 'Story number five',
    descAs: "",
    descWant: "",
    descThat: "",
    tags: [],
    colourNo: 4,
    acs: [],
    valid: true,
    error: "",
    points: 3,
    tasks: [{
        error: '',
        name: 'Do more  vuejs',
        desc: '',
        skill: 'VueJS',
        est: 20,
        valid: false
    }]
}

const project = {
    _id: 'faker',
    stories: [storyOne, storyTwo, storyThree, storyFour, storyFive]
}

//
// As product owner in a refinement meeting
// I was to add story points and add tasks to stories
// So that they are ready for sprint planning
//
// Acceptance:
// 
// mvp: (minimum viable product)
// 1. Be able to see how many stories are incomplete
// 2. Be able to add story points
// 3. Be able go to next incomplete story
// 
describe('refined.test.js', () => {
    beforeEach(() => {
        // store setup
        store.commit('project', project)
        const fakeDB = {
            get: id => {
                return new Promise((resolve, reject) => {
                    resolve(project)
                })
            },
            put: prj => {
                return new Promise((resolve, reject) => {
                    console.log(prj)
                    resolve(prj)
                })
            }
        }
        store.commit('db', fakeDB)
    })

    it('1. Should know what the state the backlog is in ', () => {
        const state = refine.methods.backlogState(project)
        expect(state.incomplete.length).toBe(3)
        expect(state.complete.length).toBe(2)
    })

    it('2. Should ibe able to add story points', () => {
    
    })

    it('3a. Should be able to set session to first incomplete ', () => {
        const first = refine.methods.startIncomplete(project)
        expect(first.name).toBe(storyThree.name)
    })

    it('3b. Should be to get next incomplete', () => {
        const next = refine.methods.nextIncomplete(project)
        expect(next.name).toBe(storyFive.name)

        const andAgain = refine.methods.nextIncomplete(project)
        expect(andAgain.name).toBe(storyThree.name)

        const onceAgain = refine.methods.nextIncomplete(project)
        expect(onceAgain.name).toBe(storyFive.name)
    })

})
