const uReducer = (state = { userName: '', token: '' }, action) => {
    switch (action.type) {
      case "USER":
        state = {
          ...state,
          userName: action.payload
        }
        break;
      case "USER_SET_TOKEN":
        state = {
          ...state,
          token: action.payload
        }
        break;
      default:
        break;
    }
    return state;
  };
  export default uReducer;
