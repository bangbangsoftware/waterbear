import storyStore from './storyStore';
import { Story, State, Session } from '@/waterbear3';

const story:Story = {
  id: 0,
  title: 'The last story',
  descAs: 'A story writer',
  descWant: 'to be able to start with a blank story',
  descThat: 'for convenience and clairty',
  tags: ['STORY'],
  colourNo: 40,
  acs: ['Must have all fields cleared'],
  valid: true,
  selected: false,
  index: -1,
  points: 10,
  error: "",
  tasks: []
};

it('If clear story mutates story to have blank values', () => {
  const state:State = <State>{
    session: {
      story,
    },
  };
  storyStore.clearStory(state);
  expect(state.session.story.title.length).toBe(0);
  expect(state.session.story.descAs.length).toBe(0);
  expect(state.session.story.descWant.length).toBe(0);
  expect(state.session.story.descThat.length).toBe(0);
  expect(state.session.story.tags.length).toBe(0);
  expect(state.session.story.colourNo).toBe(4);
  expect(state.session.story.acs.length).toBe(0);
  expect(state.session.story.valid).toBe(false);
});

it('Should be able to select a story', () => {
  const state = <State> {
    session: {
      project: {
        stories: [story],
      },
    },
  };
  storyStore.selectStory(state, 0);
  expect(story.selected).toBe(true);
});

it('Should be able to set current story', () => {
  const state = <State> {
    session: {story: {title: 'NO'}},
  };
  storyStore.currentStory(state, story);
  expect(state.session.story.title).toBe('The last story');
});

it('Should be able post a story', () => {
  const state = <State> {
    session: {
      project: {
        stories: [{index: -12, title: 'WHAT'}],
      },
      story,
    },
  };
  storyStore.clearStory(state);
  storyStore.postStory(state);
  expect(state.session.project.stories.length).toBe(1);
  expect(state.session.project.stories[0].index).toBe(0);

  state.session.story.index = -1;
  storyStore.postStory(state);
  expect(state.session.project.stories.length).toBe(2);
  expect(state.session.project.stories[0].index).toBe(1);

  state.session.story.title = 'Edited story';
  storyStore.postStory(state);
  expect(state.session.project.stories.length).toBe(2);
  expect(state.session.project.stories[0].index).toBe(1);
  expect(state.session.project.stories[0].title).toBe('Edited story');
});

it('Should be a able to add title to main story', () => {
  const state = <State> {
    session: {story: {title: 'JHgjh'}},
  };
  storyStore.clearStory(state);
  storyStore.title(state, 'eak');
  expect(state.session.story.title).toBe('eak');
});
it('Should be a able to add title to main story', () => {
  const state = <State> {
    session: {
            story: {descAs: '', descWant: '', descThat:''},
    },
  };
  storyStore.clearStory(state);
  const desc = {
    as: 'as a sleepy person',
    want: 'to sleep',
    that: 'that I feel better',
  };
  storyStore.desc(state, desc);
  expect(state.session.story.descAs).toBe(desc.as);
  expect(state.session.story.descWant).toBe(desc.want);
  expect(state.session.story.descThat).toBe(desc.that);
});
it('Should be a able remove acceptance', () => {
  const state = <State> {
    session: {
            story: {descAs: '', descWant: '', descThat:''},
    },
  };
  storyStore.clearStory(state);
  const desc = {
    as: 'as a sleepy person',
    want: 'to sleep',
    that: 'that I feel better',
  };
  storyStore.desc(state, desc);
  expect(state.session.story.descAs).toBe(desc.as);
  expect(state.session.story.descWant).toBe(desc.want);
  expect(state.session.story.descThat).toBe(desc.that);
});
it('Should be a able to remove acceptance', () => {
  story.acs = ['A bad acceptance'];
  const state = <State> {
    session: {
            story 
          }
  };
  storyStore.clearStory(state);
  storyStore.removeAcceptance(state, 0);
  expect(state.session.story.acs.length).toBe(0);
});

it('Should be a able to add acceptance', () => {
  story.acs = ['A bad acceptance'];
  const state = <State> {
    session: <Session>{
      story
    },
  };
  storyStore.clearStory(state);
  storyStore.acceptance(state, 'be able to test');
  expect(state.session.story.acs.length).toBe(1);
});

it('Should be a able to add change colour', () => {
  const state = <State> {
    session: {
      story: {colourNo: -1},
    },
  };
  storyStore.colour(state, 66);
  expect(state.session.story.colourNo).toBe(66);
});
