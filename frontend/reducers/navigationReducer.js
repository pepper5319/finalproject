const navigationReducer = (state = { activeTag: '' }, action) => {
    switch (action.type) {
      case "CHANGETAG":
        state = {
          ...state,
          activeTag: action.payload
        }
        break;
      default:
        break;
    }
    return state;
  };
  export default navigationReducer;
  