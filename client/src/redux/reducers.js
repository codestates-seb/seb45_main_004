import { SET_LOGIN_STATUS, SET_NEW_STATUS } from './actionTypes';
import { combineReducers } from 'redux';

const initialState = {
  isLogin: false,
  isNew: false,
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLogin: action.payload,
      };
    case SET_NEW_STATUS:
      return {
        ...state,
        isNew: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  header: headerReducer, // headerReducer를 추가
  // 다른 리듀서들도 필요한 경우 추가
});

export default rootReducer;
