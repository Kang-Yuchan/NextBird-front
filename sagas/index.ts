import { all, call } from 'redux-saga/effects';
import user from './user';
import post from './post';
import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:3065/api';

export default function* rootSaga(): Generator {
  yield all([call(user), call(post)]);
}
