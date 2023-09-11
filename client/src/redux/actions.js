export const login = (token) => ({
  type: 'LOGIN_SUCCESS',
  payload: token,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const newStatus = (isNew) => ({
  type: 'NEW_STATUS',
  payload: isNew,
});

export const fetchUserData = (memberId) => ({
  type: 'FETCH_USER_DATA',
  payload: memberId,
});
