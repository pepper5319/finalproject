const backtohomeReducer = (state = { homeTag: '' }, action) => {
    switch (action.type) {
      case "GETTAG":
        state = {
          ...state,
          homeTag: action.payload
        }
        break;
      default:
        break;
    }
    return state;
  };
  export default backtohomeReducer;
  