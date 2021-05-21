import { LOGIN, LOGOUT } from '../actions/type';

const getToken = () => {
  return localStorage.getItem('token');
};

const initialState = {
  isLogin: getToken(),
  token: getToken(),
};

const user = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOGIN:
      return { isLogin: true, token: payload };
    case LOGOUT:
      return { isLogin: false, token: null };
    default:
      return state;
  }
};

export default user;