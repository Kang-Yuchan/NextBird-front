import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
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
} from '../reducers/user';

function loginAPI() {
  //request to server
}

function logoutAPI() {
  //request to server
}

function signUpAPI() {
  //request to server
}

function* login(): Generator {
  try {
    yield call(loginAPI);
    yield put({
      type: LOG_IN_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
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
    });
  }
}

function* signUp(): Generator {
  try {
    yield call(signUpAPI);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
    });
  }
}

function* watchLogin(): Generator {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout(): Generator {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignup(): Generator {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga(): Generator {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup)]);
}
