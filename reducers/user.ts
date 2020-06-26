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
	editIdErrorReason: ''
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
	switch (action.type) {
		case LOG_IN_REQUEST: {
			return {
				...state,
				isLoggingIn: true,
				logInErrorReason: ''
			};
		}
		case LOG_IN_SUCCESS: {
			return {
				...state,
				isLoggingIn: false,
				me: action.data,
				isLoading: false
			};
		}
		case LOG_IN_FAILURE: {
			return {
				...state,
				isLoggingIn: false,
				me: null,
				logInErrorReason: action.error
			};
		}
		case LOG_OUT_REQUEST: {
			return {
				...state,
				isLoggingOut: true
			};
		}
		case LOG_OUT_SUCCESS: {
			return {
				...state,
				isLoggingOut: false,
				me: null
			};
		}
		case LOAD_USER_REQUEST: {
			return {
				...state
			};
		}
		case LOAD_USER_SUCCESS: {
			if (action.me) {
				return {
					...state,
					me: action.data
				};
			}
			return {
				...state,
				userInfo: action.data
			};
		}
		case LOAD_USER_FAILURE: {
			return {
				...state
			};
		}
		case SIGN_UP_REQUEST: {
			return {
				...state,
				isSigningUp: true,
				signedUp: false,
				signUpErrorReason: ''
			};
		}
		case SIGN_UP_SUCCESS: {
			return {
				...state,
				isSigningUp: false,
				signedUp: true
			};
		}
		case SIGN_UP_FAILURE: {
			return {
				...state,
				isSigningUp: false,
				signUpErrorReason: action.error
			};
		}
		case FOLLOW_USER_REQUEST: {
			return {
				...state
			};
		}
		case FOLLOW_USER_SUCCESS: {
			return {
				...state,
				me: {
					...state.me,
					Followings: [ { id: action.data }, ...state.me.Followings ]
				}
			};
		}
		case FOLLOW_USER_FAILURE: {
			return {
				...state
			};
		}
		case UNFOLLOW_USER_REQUEST: {
			return {
				...state
			};
		}
		case UNFOLLOW_USER_SUCCESS: {
			return {
				...state,
				me: {
					...state.me,
					Followings: state.me.Followings.filter((v) => v.id !== action.data)
				},
				followingList: state.followingList.filter((v) => v.id !== action.data)
			};
		}
		case UNFOLLOW_USER_FAILURE: {
			return {
				...state
			};
		}
		case ADD_POST_TO_ME: {
			return {
				...state,
				me: {
					...state.me,
					Posts: [ { id: action.data }, ...state.me.Posts ]
				}
			};
		}
		case REMOVE_POST_OF_ME: {
			return {
				...state,
				me: {
					...state.me,
					Posts: state.me.Posts.filter((v) => v.id !== action.data)
				}
			};
		}
		case LOAD_FOLLOWERS_REQUEST: {
			return {
				...state
			};
		}
		case LOAD_FOLLOWERS_SUCCESS: {
			return {
				...state,
				followerList: action.data
			};
		}
		case LOAD_FOLLOWERS_FAILURE: {
			return {
				...state
			};
		}
		case LOAD_FOLLOWINGS_REQUEST: {
			return {
				...state
			};
		}
		case LOAD_FOLLOWINGS_SUCCESS: {
			return {
				...state,
				followingList: action.data
			};
		}
		case LOAD_FOLLOWINGS_FAILURE: {
			return {
				...state
			};
		}
		case REMOVE_FOLLOWER_REQUEST: {
			return {
				...state
			};
		}
		case REMOVE_FOLLOWER_SUCCESS: {
			return {
				...state,
				me: {
					...state,
					Followers: state.me.Followers.filter((v) => v.id !== action.data)
				},
				followerList: state.followerList.filter((v) => v.id !== action.data)
			};
		}
		case REMOVE_FOLLOWER_FAILURE: {
			return {
				...state
			};
		}
		case EDIT_ID_REQUEST: {
			return {
				...state,
				isEditingId: true,
				editIdErrorReason: ''
			};
		}
		case EDIT_ID_SUCCESS: {
			return {
				...state,
				isEditingId: false,
				me: {
					...state.me,
					userId: action.data
				}
			};
		}
		case EDIT_ID_FAILURE: {
			return {
				...state,
				isEditingId: false,
				editIdErrorReason: action.error
			};
		}
		default: {
			return {
				...state
			};
		}
	}
};
export default reducer;
