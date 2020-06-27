import produce from 'immer';

export const initialState = {
	isLoggingOut: false, // Logout request
	isLoggingIn: false, // Login request
	logInErrorReason: '', // Login error reason
	signedUp: false, // Sign up success
	isSigningUp: false, // Signup request
	signUpErrorReason: '', // Signup error reason
	me: null, // My information
	followingList: [], // Follwing List
	followerList: [], // Follower List
	userInfo: null, // Different user information
	isEditingId: false,
	editIdErrorReason: '',
	hasMoreFollower: false,
	hasMoreFollowing: false
};

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// ASYNCHRONOUS SIGN UP PATTERN
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const EDIT_ID_REQUEST = 'EDIT_ID_REQUEST';
export const EDIT_ID_SUCCESS = 'EDIT_ID_SUCCESS';
export const EDIT_ID_FAILURE = 'EDIT_ID_FAILURE';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case LOG_IN_REQUEST: {
				draft.isLoggingIn = true;
				draft.logInErrorReason = '';
				break;
			}
			case LOG_IN_SUCCESS: {
				draft.isLoggingIn = false;
				draft.logInErrorReason = '';
				draft.me = action.data;
				break;
			}
			case LOG_IN_FAILURE: {
				draft.isLoggingIn = false;
				draft.me = null;
				draft.logInErrorReason = action.error;
				break;
			}
			case LOG_OUT_REQUEST: {
				draft.isLoggingOut = true;
				break;
			}
			case LOG_OUT_SUCCESS: {
				draft.isLoggingOut = false;
				draft.me = null;
				break;
			}
			case LOAD_USER_REQUEST: {
				break;
			}
			case LOAD_USER_SUCCESS: {
				if (action.me) {
					draft.me = action.data;
					break;
				}
				draft.userInfo = action.data;
				break;
			}
			case LOAD_USER_FAILURE: {
				break;
			}
			case SIGN_UP_REQUEST: {
				draft.isSigningUp = true;
				draft.signedUp = false;
				draft.signUpErrorReason = '';
				break;
			}
			case SIGN_UP_SUCCESS: {
				draft.isSigningUp = false;
				draft.signedUp = true;
				break;
			}
			case SIGN_UP_FAILURE: {
				draft.isSigningUp = false;
				draft.signUpErrorReason = action.error;
				break;
			}
			case FOLLOW_USER_REQUEST: {
				break;
			}
			case FOLLOW_USER_SUCCESS: {
				draft.me.Followings.unshift({ id: action.data });
				break;
			}
			case FOLLOW_USER_FAILURE: {
				break;
			}
			case UNFOLLOW_USER_REQUEST: {
				break;
			}
			case UNFOLLOW_USER_SUCCESS: {
				const index = draft.me.Followings.findIndex((v) => v.id === action.data);
				draft.me.Followings.splice(index, 1);
				const index2 = draft.followingList.findIndex((v) => v.id === action.data);
				draft.followingList.splice(index2, 1);
				break;
			}
			case UNFOLLOW_USER_FAILURE: {
				break;
			}
			case ADD_POST_TO_ME: {
				draft.me.Posts.unshift({ id: action.data });
				break;
			}
			case REMOVE_POST_OF_ME: {
				const index = draft.me.Posts.findIndex((v) => v.id === action.data);
				draft.me.Posts.splice(index, 1);
				break;
			}
			case LOAD_FOLLOWERS_REQUEST: {
				draft.followerList = !action.offset ? [] : draft.followerList;
				draft.hasMoreFollower = action.offset ? draft.hasMoreFollower : true; // 처음 데이터를 가져올 때는 더보기 버튼을 보여주는 걸로
				break;
			}
			case LOAD_FOLLOWERS_SUCCESS: {
				action.data.forEach((d) => {
					draft.followerList.push(d);
				});
				draft.hasMoreFollower = action.data.length === 3;
				break;
			}
			case LOAD_FOLLOWERS_FAILURE: {
				break;
			}
			case LOAD_FOLLOWINGS_REQUEST: {
				draft.followingList = !action.offset ? [] : draft.followingList;
				draft.hasMoreFollowing = action.offset ? draft.hasMoreFollowing : true; // 처음 데이터를 가져올 때는 더보기 버튼을 보여주는 걸로
				break;
			}
			case LOAD_FOLLOWINGS_SUCCESS: {
				action.data.forEach((d) => {
					draft.followingList.push(d);
				});
				draft.hasMoreFollowing = action.data.length === 3;
				break;
			}
			case LOAD_FOLLOWINGS_FAILURE: {
				break;
			}
			case REMOVE_FOLLOWER_REQUEST: {
				break;
			}
			case REMOVE_FOLLOWER_SUCCESS: {
				const index = draft.me.Followers.findIndex((v) => v.id === action.data);
				draft.me.Followers.splice(index, 1);
				const index2 = draft.followerList.findIndex((v) => v.id === action.data);
				draft.followerList.splice(index2, 1);
				break;
			}
			case REMOVE_FOLLOWER_FAILURE: {
				break;
			}
			case EDIT_ID_REQUEST: {
				draft.isEditingId = true;
				draft.editIdErrorReason = '';
				break;
			}
			case EDIT_ID_SUCCESS: {
				draft.isEditingId = false;
				draft.me.userId = action.data;
				break;
			}
			case EDIT_ID_FAILURE: {
				draft.isEditingId = false;
				draft.editIdErrorReason = action.error;
				break;
			}
			default: {
				break;
			}
		}
	});
};
export default reducer;
