import comp from './team.js'

it('should have a bunch of functions', () => {
   const app = comp.methods
   expect(typeof app.sick).toBe('function')
})
