import { combineReducers } from 'redux';

const initialState = {
  isLogin: false,
  token: null,
  isNew: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: true,
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogin: false,
        token: null,
      };
    default:
      return state;
  }
};

const newReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_STATUS':
      return {
        ...state,
        isNew: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  new: newReducer,
  // 다른 리듀서들도 필요한 경우 추가
});

export default rootReducer;
