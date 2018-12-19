export default {
  incomplete: (state: any, newState: any) => {
    state.session.incomplete = newState;
  }
};
