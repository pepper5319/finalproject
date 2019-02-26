export const navAction = (tag) => dispatch => {
    dispatch({
      type: 'CHANGETAG',
      payload: tag
    });
  }
  