import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import Axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../reducers/user';

function loginAPI(loginData) {
  return Axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}

function* login(action): Generator {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error: error,
    });
  }
}

function* watchLogin(): Generator {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function logoutAPI() {
  //request to server
  return Axios.post(
    '/user/logout',
    {},
    {
      withCredentials: true,
    },
  );
}

function* logout(): Generator {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error,
    });
  }
}

function* watchLogout(): Generator {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function loadUserAPI() {
  //request to server
  return Axios.get('/user/', {
    withCredentials: true,
  });
}

function* loadUser(): Generator {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_FAILURE,
      error: error,
    });
  }
}

function* watchLoadUser(): Generator {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function signUpAPI(signUpData) {
  return Axios.post('/user/', signUpData);
}

function* signUp(action): Generator {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error,
    });
  }
}

function* watchSignup(): Generator {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga(): Generator {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup), fork(watchLoadUser)]);
}