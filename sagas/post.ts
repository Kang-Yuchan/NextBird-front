import { all, fork, takeLatest, delay, put, call } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
} from '../reducers/post';
import Axios from 'axios';

function addPostAPI(postData) {
  return Axios.post('/post', postData, {
    withCredentials: true,
  });
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

function* watchAddPost(): Generator {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI() {
  // request to server
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

function* watchAddComment(): Generator {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadMainPostsAPI() {
  return Axios.get('/posts');
}

function* loadMainPosts(): Generator {
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: error,
    });
  }
}

function* watchLoadPosts(): Generator {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

export default function* postSaga(): Generator {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchLoadPosts)]);
}
