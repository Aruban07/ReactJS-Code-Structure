import Service from '../../lib/Service';
import { authActions as types } from '../ActionType';
import * as Cookies from '../../lib/Cookie';

const clearCookies = async () => {
  const hostname = window.location.hostname.split('.');
  let domain = null;
  if (!hostname.includes('localhost')) {
    if (hostname.length > 2) {
      domain = `.${hostname.splice(-2).join('.')}`;
    } else {
      domain = `.${hostname}`;
    }
  }
  return Cookies.eraseAllSync(domain);
};

export const storeAuthCookies = (authToken) => {
  const hostname = window.location.hostname.split('.');
  let domain = null;
  if (!hostname.includes('localhost')) {
    if (hostname.length > 2) {
      domain = `.${hostname.splice(-2).join('.')}`;
    } else {
      domain = `.${hostname}`;
    }
  }
  Cookies.set('app_token', authToken, 1, domain);
};

export const validateTokenSuccess = (authData) => (dispatch) => dispatch({
  type: types.VALIDATE_TOKEN_SUCCESS,
  payload: authData,
});

export const validateToken = (token) => async (dispatch) => {
  try {
    dispatch({
      type: types.VALIDATE_TOKEN_START,
    });
    const resData = await Service.GET({
      name: 'validate-auth-token',
      queryString: `token=${token}`,
    }).then((res) => {
      if (res.success) {
        return res.data;
      }
      throw new Error(res.message);
    });
    if (resData.userData?.isActive === 0) {
      // dispatch(logout());
      throw new Error('User Deactivated!! Contact Admin');
    }
    storeAuthCookies(resData.token);
    Cookies.set('user_id', resData.userData.id, 1);
    dispatch(validateTokenSuccess(resData));
    return true;
  } catch (error) {
    clearCookies();
    dispatch({
      type: types.VALIDATE_TOKEN_FAILED,
    });
    return false;
  }
};
