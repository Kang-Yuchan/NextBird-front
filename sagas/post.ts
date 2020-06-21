import { all, fork, takeLatest, delay, put, call } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';
import Axios from 'axios';

function addPostAPI(postData) {
  return Axios.post('/post', postData, {
    withCredentials: true,
  });
}

function addCommentAPI() {
  // request to server
}

function* addPost(action): Generator {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
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