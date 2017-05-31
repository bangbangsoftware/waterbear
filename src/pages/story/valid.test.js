import valid from './valid.js'

test('valid.spec.js', () => {
   expect(typeof valid).toBe('function')
})

test('Expect a story with zero length title to be invalid', () => {
   const story = {
      title: ''
   };
   expect(valid(story)).toBe(false);
})

test('Expect a story with zero length description "as" to be invalid', () => {
   const story = {
      title: 'Hello',
      descAs: '',
      descWant: '',
      descThat: '',
      acs: []
   };
   expect(valid(story)).toBe(false);
})

test('Expect a story with zero length description "want" to be invalid', () => {
   const story = {
      title: 'Hello',
      descAs: 'As a test',
      descWant: '',
      descThat: '',
      acs: []
   };
   expect(valid(story)).toBe(false);
})

test('Expect a story with zero length description "that" to be invalid', () => {
   const story = {
      title: 'Hello',
      descAs: 'As a test',
      descWant: 'to be able to validate a story',
      descThat: '',
      acs: []
   };
   expect(valid(story)).toBe(false);
})

test('Expect a story with zero length acs list to be invalid', () => {
   const story = {
      title: 'Hello',
      descAs: 'As a test',
      descWant: 'to be able to validate a story',
      descThat: 'the story is complete and understandable',
      acs: []
   };
   expect(valid(story)).toBe(false);
})

test('Expect a full story to be valid', () => {
   const story = {
      title: 'Hello',
      descAs: 'As a test',
      descWant: 'to be able to validate a story',
      descThat: 'the story is complete and understandable',
      acs: [
         'Must have all the fields filled in'
      ]
   };
   expect(valid(story)).toBe(true);
})
