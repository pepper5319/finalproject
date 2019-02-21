export const panAction = (pantry) => dispatch => {
    dispatch({
      type: 'GOTDATA',
      payload: pantry
    });
  }
