export const userFound = (user) => dispatch => {
  dispatch({
    type: 'USER',
    payload: user
  });
}

export const setToken = (token) => dispatch => {
    dispatch({
      type: 'USER_SET_TOKEN',
      payload: token
    });
  }
