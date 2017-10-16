import comp from './team.js'

it('should have a toggle method', () => {
    const app = comp.methods
    expect(typeof app.toggle).toBe('function')
})

it('should have some extra functions', () => {
    expect(typeof comp.makeUnique).toBe('function')
    expect(typeof comp.cycle).toBe('function')
    expect(typeof comp.dayState).toBe('function')
})

it('should be able to make Unique', () => {
    const list = [{
        name: 'bang',
        id: 0
    }, {
        name: 'thwock',
        id: 1
    }, {
        name: 'ding',
        id: 2
    }, {
        name: 'bang',
        id: 3
    }, {
        name: 'bang',
        id: 3
    }]
    const three = comp.makeUnique(list, 'name')
    expect(three.length).toBe(3)

    const four = comp.makeUnique(list, 'id')
    expect(four.length).toBe(4)
})

it('should be able to cycle state', () => {
    const mockState = {
        id: -1
    };
    let nextState = comp.cycle(mockState)
    expect(nextState.display).toBe("")

    nextState = comp.cycle(nextState)
    expect(nextState.display).toBe("WFH")

    nextState = comp.cycle(nextState)
    expect(nextState.display).toBe("OFF")

    nextState = comp.cycle(nextState)
    expect(nextState.display).toBe("SICK")

    nextState = comp.cycle(nextState)
    expect(nextState.display).toBe("")
})

it('should be able to calculate a day state', () => {
    const days = [{
        'day': [{
            'name': '7am',
            'on': false
        }, {
            'name': '8am',
            'on': false
        }, {
            'name': '9am',
            'on': false
        }, {
            'name': '10am',
            'on': true
        }, {
            'name': '11am',
            'on': true
        }, {
            'name': '12am',
            'on': false
        }, {
            'name': '1pm',
            'on': true
        }, {
            'name': '2pm',
            'on': true
        }, {
            'name': '3pm',
            'on': true
        }, {
            'name': '4pm',
            'on': true
        }, {
            'name': '5pm',
            'on': true
        }, {
            'name': '6pm',
            'on': true
        }, {
            'name': '7pm',
            'on': false
        }],
        'night': [{
            'name': '8pm',
            'on': true
        }, {
            'name': '9pm',
            'on': false
        }, {
            'name': '10pm',
            'on': false
        }, {
            'name': '11pm',
            'on': false
        }, {
            'name': '12pm',
            'on': false
        }, {
            'name': '1am',
            'on': false
        }, {
            'name': '2am',
            'on': false
        }, {
            'name': '3am',
            'on': false
        }, {
            'name': '4am',
            'on': false
        }, {
            'name': '5am',
            'on': false
        }, {
            'name': '6am',
            'on': false
        }]
    }]
    const date = new Date(2017, 9, 15, 10, 10, 10)
    const result = comp.dayState(date, days)
    expect(result.display).toBe('9 hours')
})
