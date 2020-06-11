const dummyUser = {
  name: 'kangyuchan',
  Post: [],
  Follwings: [],
  Followers: [],
  isLoggedIn: false,
  signUpData: {},
};

export const initialState = {
  isLoggedIn: false,
  user: null,
};

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const signUpAction = (data) => {
  return {
    type: SIGN_UP,
    data: data,
  };
};

export const loginAction = {
  type: LOG_IN,
  data: {
    name: 'yuchan',
  },
};
export const logoutAction = {
  type: LOG_OUT,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        signUpData: action.data,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default reducer;
