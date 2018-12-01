import store from "../../../../store.js";
import Actions from "./actions/actions";
import AcceptanceCriteriaList from "./acceptanceCriteriaList/acceptanceCriteriaList";

const movement = (index:number, newIndex:number) => {
  console.log("Moving Story");
  store.commit("moveStory", {
    index,
    newIndex
  });
  const prj = store.state.session.project;
  const db = store.state.db;
  db.get(prj._id)
    .then((p:any) => {
      p.stories = prj.stories;
      return db.put(p);
    })
    .catch((err:any) => console.error(err));
};

export default {
  name: "storycard",
  props: ["story", "c", "end"],
  data: function() {
    return {
      project: store.state.session.project,
      colourClasses: store.state.defaults.colourClasses,
      showMenu: false,
      x: 0,
      y: 0
    };
  },
  methods: {
    show(e:any) {
      e.preventDefault();
      const vue = <any> this;
      vue.showMenu = true;
      vue.x = e.clientX;
      vue.y = e.clientY;
   },
    moveTop(i:number) {
      movement(i, 0);
    },
    moveBottom(i:number) {
      movement(i, store.state.session.project.stories.length - 1);
    },
    moveDown(i:number) {
      movement(i, i + 1);
    },
    moveUp(i:number) {
      movement(i, i - 1);
    }
  },
  components: {
    actions: Actions,
    acceptanceCriteriaList: AcceptanceCriteriaList
  }
};
