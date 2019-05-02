export const backtohomeAction = (tagHome) => dispatch => {
    dispatch({
      type: 'GETTAG',
      payload: tagHome
    });
  }
  