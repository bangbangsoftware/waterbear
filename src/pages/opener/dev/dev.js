import store from '../../../store.js'
import Vue from 'vue'

import check from '../../../loginCheck.js'
import './time/time.js'
import blockers from './blockers/blockers.vue'
import condition from './condition/condition.vue'
import './dev.css'
import sprintStat from '../../../common/stats/sprintStat'

import tasks from '../../../common/stats/tasks'

import util from '../../plan/util'


const sprintless = session => {
    const owner = session.project.members.filter(m => m.owner)
    const name = (session.user.owner) ? 'You need to start a sprint!' : 'There is no sprint running, talk to ' + owner.nick
    const defined = false
    const needSprint = {
        name,
        defined
    }
    return needSprint
}

const sprint = session => {
    const spt = session.project.sprints[session.project.current.sprintIndex]
    spt.defined = true
    return spt
}

// This is wrong it should be total member hours (100%) over hour many member hours left
const percent = (stat, now = new Date()) => {

    const totalHours = stat.totalHours
    const percent = totalHours / 100
    const hoursLeft = stat.unplannedHoursLeft
    const hoursDone = totalHours - hoursLeft
    const percentDone = Math.round(hoursDone / percent)
    return percentDone
        //    const start = new Date(sprint.startDate)
        //    const timeDiff = Math.abs(now.getTime() - start.getTime())
        //    const done = Math.ceil(timeDiff / (1000 * 3600 * 24))
        //    const percent = sprint.days / 100
        //    return done * percent * 100
}

const colour = timePercent => (timePercent < 30) ?
    'success' : (timePercent < 70) ? 'warning' : 'error'

const reverseColour = timePercent => (timePercent > 70) ?
    'success' : (timePercent > 30) ? 'warning' : 'error'

const progress = (name, percent, colour) => {
    return {
        name,
        percent,
        colour
    }
}

const progressList = (currentSprint, stat) => {
    const progressList = []
    const timePercentage = percent(stat)
    progressList.push(progress("Time", timePercentage, colour(percent)))
    const taskPercent = tasks.tasksDonePercentage(currentSprint)
    progressList.push(progress("Tasks", taskPercent, reverseColour(taskPercent)))
    progressList.push(progress("Contingency", taskPercent, reverseColour(taskPercent)))
    return progressList
}

const current = session => {
    const noSprint = (session.project.current.sprintIndex < 0 ||
        session.project.sprints === undefined ||
        session.project.sprints.length === 0)
    return (noSprint) ? sprintless(session) : sprint(session)
}

const comp = {
    name: 'opendev',
    components: {
        blockers,
        condition
    },
    beforeCreate: function() {
        check()
    },
    computed: {
        todo: function() {
            const currentSprint = current(store.state.session)
            return sprintStat.taskToDo(currentSprint)
        },
        mine: function() {
            const currentSprint = current(store.state.session)
            return sprintStat.mine(currentSprint, store.state.session.user)
        }
    },
    data: function() {
        const session = store.state.session
        console.log(session.user)
        const project = session.project
        const members = project.members
        const currentSprint = current(session)
        const stat = sprintStat.contingency(currentSprint, members)
        return {
            session,
            sprint: currentSprint,
            progressList: progressList(currentSprint, stat),
            stat
        }
    },
    methods: {
        endDate: sprint => tasks.endDate(sprint),
        assign: function(sprint, task) {
            console.log('You have selected', task)
            task.assignedTo = this.session.user.name
            if (!task.history) {
                task.history = []
            }
            const date = new Date()
            const action = "assigned"
            const user = this.session.user.name
            const history = {
                date,
                action,
                user
            }
            task.history.push(history)
            store.commit('task', task)
            util.storeSprintTask(task)
        },
        unassign: function(sprint, task) {
            console.log('You have selected', task)
            task.assignedTo = undefined
            const date = new Date()
            const action = "unassigned"
            const user = this.session.user.name
            const history = {
                date,
                action,
                user
            }
            task.history.push(history)
            store.commit('task', task)
            util.storeSprintTask(task)
        }
    }
}

Vue.component('opendev', comp)

export default comp
