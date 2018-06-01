import sprint from './sprintStat.js'

import diary from '../setup/diary.js'

import defaults from '../setup/hours.js'

import memberData from './test.member.js'

import sprintData from './test.sprint.js'

import dataOne  from '../test.data.js'

describe("sprintStat.test.js: How time works with the sprint and members", () => {

    it("Should tell many hours left in sprint for two members", () => {
        const data = dataOne()
        const hours = sprint.hoursLeft(data.sprint, data.members, data.startDate)
        expect(hours).toBe(112)

        const lessHours = sprint.hoursLeft(data.sprint, data.members, data.weekLater)
        expect(lessHours).toBe(32)

        const noHours = sprint.hoursLeft(data.sprint, data.members, data.over)
        expect(noHours).toBe(0)
    })

   it("should be able to give contingency", () => {
        sprintData.startDate = new Date(2018, 7, 21, 12, 20, 0, 0)
        const now = new Date(2018, 7, 2, 12, 20, 0, 0)
        const another = JSON.parse(JSON.stringify(memberData))
        const state = sprint.contingency(sprintData, [memberData, another], now)

        expect(state.skills.length).toBe(1)
        const skill = state.skills[0]

        expect(skill.name).toBe('vue')
        expect(skill.left).toBe(0)

        expect(state.members.length).toBe(2)
        const member1 = state.members[0]
        const member2 = state.members[1]

        expect(member1.left).toBe(36)
        expect(member2.left).toBe(56)
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
