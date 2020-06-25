import { all, fork, takeLatest, takeEvery, call, put } from 'redux-saga/effects';
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
	FOLLOW_USER_REQUEST,
	FOLLOW_USER_SUCCESS,
	FOLLOW_USER_FAILURE,
	UNFOLLOW_USER_REQUEST,
	UNFOLLOW_USER_SUCCESS,
	UNFOLLOW_USER_FAILURE
} from '../reducers/user';

function loginAPI(loginData) {
	return Axios.post('/user/login', loginData, {
		withCredentials: true
	});
}

function* login(action): Generator {
	try {
		const result = yield call(loginAPI, action.data);
		yield put({
			type: LOG_IN_SUCCESS,
			data: result.data
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: LOG_IN_FAILURE,
			error: error
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
			withCredentials: true
		}
	);
}

function* logout(): Generator {
	try {
		yield call(logoutAPI);
		yield put({
			type: LOG_OUT_SUCCESS
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: LOG_OUT_FAILURE,
			error: error
		});
	}
}

function* watchLogout(): Generator {
	yield takeLatest(LOG_OUT_REQUEST, logout);
}

function loadUserAPI(userId: number) {
	//request to server
	return Axios.get(userId ? `/user/${userId}` : '/user/', {
		withCredentials: true
	});
}

function* loadUser(action): Generator {
	try {
		const result = yield call(loadUserAPI, action.data);
		yield put({
			type: LOAD_USER_SUCCESS,
			data: result.data,
			me: !action.data
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: LOAD_USER_FAILURE,
			error: error
		});
	}
}

function* watchLoadUser(): Generator {
	yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function signUpAPI(signUpData) {
	return Axios.post('/user/', signUpData);
}

function* signUp(action): Generator {
	try {
		yield call(signUpAPI, action.data);
		yield put({
			type: SIGN_UP_SUCCESS
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: SIGN_UP_FAILURE,
			error: error
		});
	}
}

function* watchSignup(): Generator {
	yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function followAPI(userId) {
	return Axios.post(
		`/user/${userId}/follow`,
		{},
		{
			withCredentials: true
		}
	);
}

function* follow(action): Generator {
	try {
		const result = yield call(followAPI, action.data);
		yield put({
			type: FOLLOW_USER_SUCCESS,
			data: result.data
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: FOLLOW_USER_FAILURE,
			error: error
		});
	}
}

function* watchFollow(): Generator {
	yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

function unfollowAPI(userId) {
	return Axios.delete(`/user/${userId}/follow`, {
		withCredentials: true
	});
}

function* unfollow(action): Generator {
	try {
		const result = yield call(unfollowAPI, action.data);
		yield put({
			type: UNFOLLOW_USER_SUCCESS,
			data: result.data
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: UNFOLLOW_USER_FAILURE,
			error: error
		});
	}
}

function* watchUnfollow(): Generator {
	yield takeLatest(UNFOLLOW_USER_REQUEST, unfollow);
}

export default function* userSaga(): Generator {
	yield all([
		fork(watchLogin),
		fork(watchLogout),
		fork(watchSignup),
		fork(watchLoadUser),
		fork(watchFollow),
		fork(watchUnfollow)
	]);
}
