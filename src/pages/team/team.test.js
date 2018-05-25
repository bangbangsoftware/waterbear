import comp from './team.js'

it('should have a toggle method', () => {
    const app = comp.methods
    expect(typeof app.toggle).toBe('function')
})

it('should have some extra functions', () => {
    expect(typeof comp.cycle).toBe('function')
})

it('should be able to cycle state', () => {
    const mockState = {
        state: -1
    };
    let nextState = comp.cycle(mockState)
    expect(nextState.display).toBe("0 hours")

    nextState = comp.cycle(nextState)
    expect(nextState.display).toBe("WFH")

    nextState = comp.cycle(nextState)
    expect(nextState.display).toBe("OFF")

    nextState = comp.cycle(nextState)
    expect(nextState.display).toBe("SICK")

    nextState = comp.cycle(nextState)
    expect(nextState.display).toBe("0 hours")
})

