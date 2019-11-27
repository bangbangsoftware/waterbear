import validStory from "./valid";
import store from "../../store";
import { State, Movement, StoryDesc, Story } from "@/waterbear3";

export default {
  storyError: (state: State, message: string) => {
    state.session.story.error = message;
    state.session.story.valid = false;
  },
  storyOk: (state: State) => {
    state.session.story.error = "";
    state.session.story.valid = true;
  },
  clearStory: (state: State) => {
    state.session.story = {
      id: -1,
      tasks: [],
      points: -1,
      error: "",
      selected: false,
      title: "",
      descAs: "",
      descWant: "",
      descThat: "",
      tags: [],
      colourNo: 4,
      acs: [],
      valid: false,
      index: -1
    };
  },
  selectStory: (state: State, selected: number) => {
    const stories = state.session.project.stories;
    const selectedStories = stories.map((story: Story, i: number) => {
      story.selected = i === selected;
      return story;
    });
    state.session.project.stories = selectedStories;
    const theStory = selectedStories[selected];
    theStory.index = selected;
    store.commit("currentStory", theStory);
  },
  currentStory: (state: State, story: Story) => {
    state.session.story = story;
  },
  deleteStory: (state: State, selected: number) => {
    // this doesnt seem right?? is this right?
    store.state.session.project.stories.splice(selected, 1);
  },
  postStory: (state: State) => {
    if (!state.session.project.stories) {
      state.session.project.stories = [];
    }
    if (state.session.story.index > -1) {
      state.session.project.stories[state.session.story.index] =
        state.session.story;
      store.commit("log", 'updating "' + state.session.story.title + '" story');
    } else {
      state.session.story.index = state.session.project.stories.length;
      state.session.project.stories.push(state.session.story);
      store.commit("log", 'Added "' + state.session.story.title + '" story');
    }
    store.commit("clearStory");
  },
  moveStory: (state: State, movement: Movement) => {
    if (!state.session.project.stories) {
      state.session.project.stories = [];
    }
    const newIndex = movement.newIndex;
    if (newIndex > state.session.project.stories.length || newIndex < 0) {
      return;
    }
    const mover = state.session.project.stories[movement.index];
    state.session.project.stories.splice(movement.index, 1);
    state.session.project.stories.splice(newIndex, 0, mover);
  },
  title: (state: State, t: string) => {
    state.session.story["title"] = t;
    validStory(state.session.story);
  },
  desc: (state: State, desc: StoryDesc) => {
    state.session.story.descAs = desc.as;
    state.session.story.descWant = desc.want;
    state.session.story.descThat = desc.that;
    validStory(state.session.story);
  },
  removeAcceptance: (state: State, index: number) => {
    state.session.story.acs.splice(index, 1);
    validStory(state.session.story);
  },
  acceptance: (state: State, crit: string) => {
    state.session.story.acs.push(crit);
    validStory(state.session.story);
  },
  colour: (state: State, no: number) => {
    state.session.story.colourNo = no;
  }
};
