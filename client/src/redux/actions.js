import { SET_LOGIN_STATUS, SET_NEW_STATUS } from './actionTypes';

export const setLoginStatus = (isLogin) => ({
  type: SET_LOGIN_STATUS,
  payload: isLogin,
});

export const setNewStatus = (isNew) => ({
  type: SET_NEW_STATUS,
  payload: isNew,
});
