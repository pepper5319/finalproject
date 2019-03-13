const recipeReducer = (state = { recipes: [], recipe: null }, action) => {
  switch (action.type) {
    case "RECIPES_SUCCESS":
      state = {
        ...state,
        recipes: action.payload
      }
      break;
    case "RECIPES_SET_SUCCESS":
      console.log(action.payload);
      state = {
        ...state,
        recipe: action.payload
      }
      break;
    case "RECIPES_SINGLE_SUCCESS":
      state = {
        ...state,
        recipe: action.payload
      }
      break;
    default:
      break;
  }
  return state;
};
export default recipeReducer;
