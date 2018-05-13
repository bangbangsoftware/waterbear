import valid from '../valid/validSprint'

const comp = {
    state: (sprint, now = new Date()) => {
        const fail = valid(sprint, now)
        if (fail) {
            return fail
        }
    }
}

export default comp

// impact * cost * confidence / time = score
