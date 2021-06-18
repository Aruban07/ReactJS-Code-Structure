import { userActions as types } from '../ActionType';

export const userLast = (userData) => (dispatch) => dispatch({
  type: types.USER_FETCH_SUCCESS,
  payload: userData,
});
