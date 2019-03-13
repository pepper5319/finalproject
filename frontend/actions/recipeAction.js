import { RECIPES_URL } from '../apiUrls.js';
export const getRecipes = (token) => dispatch => {
  fetch(RECIPES_URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token ' + token
      },
    })
    .then(res => {
      if(res.status === 200){
        return res.json()
      }else{
        alert(res.statusText);
      }
    })
    .then(data => dispatch({
      type: 'RECIPES_SUCCESS',
      payload: data,
    }));
}

export const getSingleRecipe = (token, id) => dispatch => {
  fetch(RECIPES_URL + id + '/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token ' + token
      },
    })
    .then(res => res.json())
    .then(res => {
      if(res.status === 200){
        return res.json()
      }else{
        alert(res.statusText);
      }
    })
    .then(data => dispatch({
      type: 'RECIPES_SINGLE_SUCCESS',
      payload: data,
    }));
}
