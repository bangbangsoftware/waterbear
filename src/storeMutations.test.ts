import mut from './storeMutations.js';

it('set loaded state', () => {
  const state = {
    session: {loaded: false},
  };
  mut.loaded(state, true);
  expect(state.session.loaded).toBe(true);
});

it('Should be able to push a new stage', () => {
  const state = {
    signup: {
      stages: [],
    },
  };
  mut.stage(state, 'bang');
  expect(state.signup.stages[0]).toBe('bang');
});

it('Should be able to set a database', () => {
  const state = {db: {}};
  mut.db(state, 'teeth');
  expect(state.db).toBe('teeth');
});

it('Should be able to set an error', () => {
  const state = {session: {error: ''}};
  mut.error(state, 'bad');
  expect(state.session.error).toBe('bad');
});

it('Should be able to set a project', () => {
  const state = {session: {project: ''}};
  mut.project(state, 'Waterbear');
  expect(state.session.project).toBe('Waterbear');
});

