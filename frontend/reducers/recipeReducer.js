const recipeReducer = (state = { recipes: [], recipe: null, recipe_id: null }, action) => {
  switch (action.type) {
    case "RECIPES_SUCCESS":
      state = {
        ...state,
        recipes: action.payload
      }
      break;
    case "RECIPES_SET_SUCCESS":
      state = {
        ...state,
        recipe_id: action.payload.static_id
      }
      break;
    case "RECIPES_SINGLE_SUCCESS":
      console.log(action.payload);
      state = {
        ...state,
        recipe: action.payload
      }
      break;
    case "NULL_RECIPE":
      state = {
        ...state,
        recipe: null,
        recipe_id: null
      }
      break;
    default:
      break;
  }
  return state;
};
export default recipeReducer;
