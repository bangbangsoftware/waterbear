export default {
  planState: (state: any, newState: string) => {
    state.session.planState = newState;
  }
};
