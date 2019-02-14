const picReducer = (state = { picURL: '' }, action) => {
  switch (action.type) {
    case "GOTPIC":
      state = {
        ...state,
        picURL: action.payload
      }
      break;
    default:
      break;
  }
  return state;
};
export default picReducer;
