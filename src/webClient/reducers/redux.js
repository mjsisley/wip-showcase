const initialState = { value: 0 };

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case "COUNTER_INCREMENT":
      return {
        value: state.value + payload
      };

    case "COUNTER_DECREMENT":
      return {
        value: state.value - payload
      };

    default:
      return state;
  }
};
