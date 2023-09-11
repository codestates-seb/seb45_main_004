import { combineReducers } from 'redux';

const initialState = {
  isLogin: false,
  token: null,
  memberId: null,
  isNew: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
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

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_DATA':
      return {
        ...state,
        memberId: action.payload,
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
  user: userReducer,
  new: newReducer,
  // 다른 리듀서들도 필요한 경우 추가
});

export default rootReducer;
