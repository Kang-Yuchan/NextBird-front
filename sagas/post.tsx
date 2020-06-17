import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

function addPostAPI() {
  // request to server
}

function addCommentAPI() {
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

function* addComment(action): Generator {
  try {
    //yield call(addCommentAPI);
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error,
    });
  }
}

function* watchAddPost(): Generator {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment(): Generator {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga(): Generator {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
