import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

function loginAPI() {
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

function* watchLogin(): Generator {
  yield takeLatest(LOG_IN, function* () {
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
    });
  });
}

export default function* userSaga(): Generator {
  yield all([fork(watchLogin)]);
}
