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
	UNFOLLOW_USER_FAILURE,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWERS_SUCCESS,
	LOAD_FOLLOWERS_FAILURE,
	LOAD_FOLLOWINGS_REQUEST,
	LOAD_FOLLOWINGS_FAILURE,
	LOAD_FOLLOWINGS_SUCCESS,
	REMOVE_FOLLOWER_SUCCESS,
	REMOVE_FOLLOWER_FAILURE,
	REMOVE_FOLLOWER_REQUEST,
	EDIT_ID_REQUEST,
	EDIT_ID_SUCCESS,
	EDIT_ID_FAILURE
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
			reason: error.response && error.response.data
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

function loadFollowersAPI(userId, offset = 0, limit = 3) {
	return Axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`, {
		withCredentials: true
	});
}

function* loadFollowers(action): Generator {
	try {
		const result = yield call(loadFollowersAPI, action.data, action.offset);
		yield put({
			type: LOAD_FOLLOWERS_SUCCESS,
			data: result.data
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: LOAD_FOLLOWERS_FAILURE,
			error: error
		});
	}
}

function* watchLoadFollowers(): Generator {
	yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI(userId, offset = 0, limit = 3) {
	return Axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`, {
		withCredentials: true
	});
}

function* loadFollowings(action): Generator {
	try {
		const result = yield call(loadFollowingsAPI, action.data, action.offset);
		yield put({
			type: LOAD_FOLLOWINGS_SUCCESS,
			data: result.data
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: LOAD_FOLLOWINGS_FAILURE,
			error: error
		});
	}
}

function* watchLoadFollowings(): Generator {
	yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI(userId) {
	return Axios.delete(`/user/${userId}/follower`, {
		withCredentials: true
	});
}

function* removeFollower(action): Generator {
	try {
		const result = yield call(removeFollowerAPI, action.data);
		yield put({
			type: REMOVE_FOLLOWER_SUCCESS,
			data: result.data
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: REMOVE_FOLLOWER_FAILURE,
			error: error
		});
	}
}

function* watchRemoveFollower(): Generator {
	yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editIdAPI(userId) {
	return Axios.patch(
		`/user/userId`,
		{ userId },
		{
			withCredentials: true
		}
	);
}

function* editId(action): Generator {
	try {
		const result = yield call(editIdAPI, action.data);
		yield put({
			type: EDIT_ID_SUCCESS,
			data: result.data
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: EDIT_ID_FAILURE,
			error: error
		});
	}
}

function* watchEditId(): Generator {
	yield takeLatest(EDIT_ID_REQUEST, editId);
}

export default function* userSaga(): Generator {
	yield all([
		fork(watchLogin),
		fork(watchLogout),
		fork(watchSignup),
		fork(watchLoadUser),
		fork(watchFollow),
		fork(watchUnfollow),
		fork(watchLoadFollowers),
		fork(watchLoadFollowings),
		fork(watchRemoveFollower),
		fork(watchEditId)
	]);
}
