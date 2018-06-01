import diary from './setup/diary.js'
import util from './util.js'

import defaults from './setup/hours.js'

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

export default dataOne

describe("sprintStat.test.js: How time works with the sprint and members", () => {

    /// generate diary through member for sprint.
    it('Should be able tell how many hours a member has on a given day', () => {
        const data = dataOne()
        const hours = util.hours(data.member, data.startDate)
        expect(hours).toBe(8)
        const none = util.hours(data.member, data.saturday)
        expect(none).toBe(0)
    })

    it("Should be able to tell what hours a member has at a point of time", () => {
        const data = dataOne()
        const user = data.member
        const now = new Date(2018, 7, 22, 7, 0, 0, 0)
        const state = util.currentHours(now, user)
        expect(state.done).toBe(0)
        expect(state.left).toBe(8)

        const later = new Date(2018, 7, 22, 12, 20, 0, 0) // 11:20 am
        const state2 = util.currentHours(later, user)
        expect(state2.done).toBe(3)
        expect(state2.left).toBe(5)
    })
 
    it("Should map date", () => {
        expect(util.mapper("1pm")).toBe(13)
        expect(util.mapper("2pm")).toBe(14)
        expect(util.mapper("3pm")).toBe(15)
        expect(util.mapper("12pm")).toBe(0)
        expect(util.mapper("12am")).toBe(12)
    })

    it("Should tell many hours a member has left in sprint", () => {
        const data = dataOne()
        const hours = util.left(data.sprint, data.member, data.startDate)
        expect(hours).toBe(56)
    })


})

