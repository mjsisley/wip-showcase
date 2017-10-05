const initialState = {
  hey: 0
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case "HEY":
      return { ...state, hey: state.hey + 1 };
    default:
      return state;
  }
}
