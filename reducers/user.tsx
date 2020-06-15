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

//ASYNCHRONOUS SIGN UP PATTERN
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

//ASYNCHRONOUS LOG IN PATTERN
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

//ASYNCHRONOUS LOG OUT PATTERN
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const signUpAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data: data,
  };
};

export const signUpSuccess = {
  type: SIGN_UP_SUCCESS,
};

export const loginAction = {
  type: LOG_IN_REQUEST,
  data: {
    name: 'yuchan',
  },
};
export const logoutAction = {
  type: LOG_OUT_REQUEST,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggedIn: true,
        loginData: action.data,
        isLoading: true,
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser,
        isLoading: false,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpData: action.data,
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
