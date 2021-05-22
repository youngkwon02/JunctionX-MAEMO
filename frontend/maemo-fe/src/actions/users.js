import { LOGIN, LOGOUT } from './type';

const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const login = (token) => {
  setToken(token);
  return {
    type: LOGIN,
    payload: token,
  };
};

const deleteToken = () => {
  localStorage.removeItem('token');
};

export const logout = () => {
  deleteToken();
  return {
    type: LOGOUT,
  };
};