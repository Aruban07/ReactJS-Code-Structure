import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// Reducers
import user from './reducer-user';

export default combineReducers({
  form,
  user,
});
