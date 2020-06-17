import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE } from '../reducers/post';

function addPostAPI() {
  // request to server
}

function* addPost(): Generator {
  try {
    //yield call(addPostAPI);
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      error: error,
    });
  }
}

function* watchAddPost(): Generator {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga(): Generator {
  yield all([fork(watchAddPost)]);
}
