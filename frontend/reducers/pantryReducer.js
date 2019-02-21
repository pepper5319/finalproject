const navigationReducer = (state = { pantryData: '' }, action) => {
    switch (action.type) {
      case "GETDATA":
        state = {
          ...state,
          pantryData: action.payload
        }
        break;
      default:
        break;
    }
    return state;
  };
  export default pantryReducer;
