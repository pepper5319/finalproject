export const picFound = (url) => dispatch => {
  dispatch({
    type: 'GOTPIC',
    payload: url
  });
}
