import validStory from "./valid.js";
import store from "../../store.js";

export default {
        storyError: (state:any, message:string) => {
    state.session.story.error = message;
    state.session.story.valid = false;
  },
        storyOk: (state:any) => {
    state.session.story.error = "";
    state.session.story.valid = true;
  },
        clearStory: (state:any) => {
    state.session.story = {
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
        selectStory: (state:any, selected:number) => {
    const stories = state.session.project.stories;
    const selectedStories = stories.map((story:any, i:number) => {
      story.selected = i === selected;
      return story;
    });
    state.session.project.stories = selectedStories;
    const theStory = selectedStories[selected];
    theStory.index = selected;
    store.commit("currentStory", theStory);
  },
        currentStory: (state:any, story:any) => {
    state.session.story = story;
  },
        deleteStory: (state:any, selected:number) => {
    // this doesnt seem right?? is this right?
    store.state.session.project.stories.splice(selected, 1);
  },
        postStory: (state:any) => {
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
        moveStory: (state:any, movement:any) => {
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
        title: (state:any, t:string) => {
    state.session.story["title"] = t;
    validStory(state.session.story);
  },
        desc: (state:any, desc:any) => {
    state.session.story.descAs = desc.as;
    state.session.story.descWant = desc.want;
    state.session.story.descThat = desc.that;
    validStory(state.session.story);
  },
        removeAcceptance: (state:any, index:number) => {
    state.session.story.acs.splice(index, 1);
    validStory(state.session.story);
  },
        acceptance: (state:any, crit:string) => {
    state.session.story.acs.push(crit);
    validStory(state.session.story);
  },
        colour: (state:any, no:number) => {
    state.session.story.colourNo = no;
  }
};
