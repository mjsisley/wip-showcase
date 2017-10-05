import { REHYDRATE } from "redux-persist/constants";
const initialState = { rehydrated: false };

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case "FIELD_CHANGE":
      return {
        ...state,
        [payload.name]: payload.value
      };
    case REHYDRATE:
      return { ...state, ...payload.multiForm, rehydrated: true };

    // case "COUNTER_DECREMENT":
    //   return {
    //     value: state.value - payload
    //   };

    default:
      return state;
  }
};
