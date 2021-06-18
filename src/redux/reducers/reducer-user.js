import { userActions as type } from '../ActionType';

const initialState = { name: 'ruban' };
const user = (state = initialState, action) => {
  switch (action.type) {
    case type.USER_FETCH_START:
      return { ...state, loading: true };
    case type.USER_FETCH_FAILED:
      return { ...state, error: true };
    case type.USER_FETCH_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default user;
