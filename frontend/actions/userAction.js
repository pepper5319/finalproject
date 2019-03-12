export const userFound = (user) => dispatch => {
    dispatch({
      type: 'USER',
      payload: user
    });
  }