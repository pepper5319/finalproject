const tReducer = (state = { token: '', }, action) => {
    switch (action.type) {
      case "TOKEN":
        state = {
          ...state,
          token: action.payload,
        }
        break;
      default:
        break;
    }
    return state;
  };
  export default tReducer;
