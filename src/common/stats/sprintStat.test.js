import sprint from './sprintStat.js'

import diary from '../setup/diary.js'

import defaults from '../setup/hours.js'

import memberData from './test.member.js'

const dataOne = () => {
    const startDate = new Date(2018, 7, 21, 9, 0, 0, 0)
    const weekLater = new Date(2018, 7, 28, 10, 0, 0, 0)
    const saturday = new Date(2018, 4, 26, 10, 0, 0, 0) // this is 26 of March ???
    const over = new Date(2018, 8, 10, 10, 0, 0, 0)
    const now = new Date(2018, 7, 22, 10, 0, 0, 0)

    const days = defaults()
    const members = [{
        id: 3,
        name: "mick",
        days
    }, {
        id: 4,
        name: "fred",
        days
    }]
    const both = diary.setup(members, startDate)
    const member = both.members[0]

    const taskOne = {
        name: "Go go go!",
        status: "todo",
        est: 2,
        assignedTo: {
            id: 3
        }
    }
    const taskTwo = {
        name: "Go on then",
        status: "todo",
        est: 8,
        assignedTo: {
            id: 0
        }
    }
    const story = {
        tasks: [taskOne, taskTwo]
    }
    const sprint = {
        startDate,
        list: [story],
        days: 10
    }

    return {
        startDate,
        weekLater,
        over,
        sprint,
        member,
        saturday,
        members: both.members
    }

}

describe("sprintStat.test.js: How time works with the sprint and members", () => {

    /// generate diary through member for sprint.
    it('Should be able tell how many hours a member has on a given day', () => {
        const data = dataOne()
        const hours = sprint.hours(data.member, data.startDate)
        expect(hours).toBe(8)
        const none = sprint.hours(data.member, data.saturday)
        expect(none).toBe(0)
    })

    it("Should tell many hours a member has left in sprint", () => {
        const data = dataOne()
        const hours = sprint.left(data.sprint, data.member, data.startDate)
        expect(hours).toBe(56)
    })

    it("Should tell many hours left in sprint for two members", () => {
        const data = dataOne()
        const hours = sprint.hoursLeft(data.sprint, data.members, data.startDate)
        expect(hours).toBe(112)

        const lessHours = sprint.hoursLeft(data.sprint, data.members, data.weekLater)
        expect(lessHours).toBe(32)

        const noHours = sprint.hoursLeft(data.sprint, data.members, data.over)
        expect(noHours).toBe(0)
    })

    it("Should know how which tasks have not started", () => {
        const data = dataOne()
        const taskData = sprint.tasksNotStarted(data.sprint)
        expect(taskData.est).toBe(10)
        expect(taskData.qty).toBe(2)
        expect(taskData.tasks[0].status).toBe("todo")
    })

    it("Should map date", () => {
        expect(sprint.mapper("1pm")).toBe(13)
        expect(sprint.mapper("2pm")).toBe(14)
        expect(sprint.mapper("3pm")).toBe(15)
        expect(sprint.mapper("12pm")).toBe(0)
        expect(sprint.mapper("12am")).toBe(12)
    })

    it("Should be able to tell what hours a member has at a point of time", () => {
        const data = dataOne()
        const user = data.member
        const now = new Date(2018, 7, 22, 7, 0, 0, 0)
        const state = sprint.currentHours(now, user)
        expect(state.done).toBe(0)
        expect(state.left).toBe(8)

        const later = new Date(2018, 7, 22, 12, 20, 0, 0) // 11:20 am
        const state2 = sprint.currentHours(later, user)
        expect(state2.done).toBe(3)
        expect(state2.left).toBe(5)
    })

    it("should describe started tasks by hours under/over", () => {
        const data = dataOne()
        const user = data.member
        const task = {
            "name": "start button",
            "desc": "Make the start button do something",
            "est": "10",
            "skill": "vue",
            "error": "",
            "valid": true,
            "start": new Date(2018, 7, 21, 12, 20, 0, 0),
            "index": 0
        };
        const now = new Date(2018, 7, 22, 13, 10, 0, 0)
        const state = sprint.taskState(task, user, now)
        expect(state.done).toBe(11)
        expect(state.left).toBe(-1)
    })
})


// Need to describe how the sprint is doing by with % behind/infront. 
// What tasks are dragging
// What tasks where done quickly
describe("sprintStat.test.js: Describe how the sprint is doing", () => {

    xit('Should be able to tell how far behind a sprint is', () => {
        const data = dataOne()
        const mockSprint = data.sprint
        const member = data.member
        const startDate = data.startDate

        const summary = sprint.state(mockSprint, member, startDate)
        expect(summary.state).toBe("The sprint is behind by 5%")
        expect(summary.description).toBe("")
    })

})
