const uReducer = (state = { userName: '', }, action) => {
    switch (action.type) {
      case "USER":
        state = {
          ...state,
          userName: action.payload,
        }
        break;

      default:
        break;
    }
    return state;
  };
  export default uReducer;
