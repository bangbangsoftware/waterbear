import mut from './storeMutations.js';
import { State, Session, Project } from '@/waterbear3';

const session:Session = <Session> {loaded: false};

const state:State = <State>{
  session
};
it('set loaded state', () => {

  mut.loaded(state, true);
  expect(state.session.loaded).toBe(true);
});

it('Should be able to push a new stage', () => {
  state.signup = {stages: []};
  mut.stage(state, 'bang');
  expect(state.signup.stages[0]).toBe('bang');
});

it('Should be able to set a database', () => {
  state.db =  {get: () => { return "NOSE"}, put: () => {}};
  const mydb = {get: () => { return "teeth"}, put: () => {}};
  mut.db(state, mydb);
  expect(state.db.get()).toBe('teeth');
});

it('Should be able to set an error', () => {
  state.session.error = '';
  mut.error(state, 'bad');
  expect(state.session.error).toBe('bad');
});

it('Should be able to set a project', () => {
  state.session.project =  <Project> {};
  const prj:Project = <Project> {};
  prj.name = "Waterbear";
  mut.project(state, prj);
  expect(state.session.project.name).toBe('Waterbear');
});

