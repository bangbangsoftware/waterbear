import tasks from './tasks.js'
import dataOne from '../test.data.js'

describe("tasks.test.js: How is a member doing", () => {

    it("should describe started task by hours under/over", () => {
        const data = dataOne()
        const user = data.member
        const task = {
            "name": "start button",
            "desc": "Make the start button do something",
            "est": 10,
            "skill": "vue",
            "valid": true,
            "start": new Date(2018, 7, 21, 12, 20, 0, 0)
        };
        const now = new Date(2018, 7, 22, 13, 10, 0, 0)
        const state = tasks.taskState(task, user, now)
        expect(state.done).toBe(9)
        expect(state.left).toBe(1)
    })

    it("Should know how which tasks have not started", () => {
        const data = dataOne()
        const taskData = tasks.tasksNotStarted(data.sprint)
        expect(taskData.est).toBe(10)
        expect(taskData.qty).toBe(2)
        expect(taskData.tasks[0].status).toBe("todo")
    })

    it("should describe finished task by hours under/over ", () => {
        const data = dataOne()
        const user = data.member
        const task = {
            "name": "start button",
            "desc": "Make the start button do something",
            "est": 10,
            "skill": "vue",
            "valid": true,
            "start": new Date(2018, 7, 21, 12, 20, 0, 0),
            "end": new Date(2018, 7, 22, 10, 20, 0, 0)
        };
        const now = new Date(2018, 7, 22, 13, 10, 0, 0)
        const state = tasks.taskState(task, user, now)
        expect(state.done).toBe(7)
        expect(state.left).toBe(3)
    })

})
