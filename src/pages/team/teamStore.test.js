import teamStore from './teamStore.js'

it('is possbile to book day off sick', () => {
    const state = {
        members: []
    }
    const date = new Date(2017, 11, 12, 8, 2)
    teamStore.sick(state, 'fred', date)
        //expect(state.session.user.nick).toBe('fred')
})
