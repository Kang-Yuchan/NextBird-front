import * as React from 'react';
import ProfileForm from '../containers/ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWINGS_REQUEST,
	UNFOLLOW_USER_REQUEST,
	REMOVE_FOLLOWER_REQUEST
} from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import Post from '../containers/Post';
import { RootState } from '../reducers';
import FollowLists from '../containers/FollowLists';

const Profile: React.ReactNode = () => {
	const dispatch = useDispatch();
	const { followingList, followerList, hasMoreFollower, hasMoreFollowing } = useSelector(
		(state: RootState) => state.user
	);
	const { mainPosts } = useSelector((state: RootState) => state.post);

	const onUnfollow = React.useCallback(
		(userId) => () => {
			dispatch({
				type: UNFOLLOW_USER_REQUEST,
				data: userId
			});
		},
		[]
	);

	const onRemoveFollower = React.useCallback(
		(userId) => () => {
			dispatch({
				type: REMOVE_FOLLOWER_REQUEST,
				data: userId
			});
		},
		[]
	);

	const loadMoreFollowings = React.useCallback(
		() => {
			dispatch({
				type: LOAD_FOLLOWINGS_REQUEST,
				offset: followingList.length
			});
		},
		[ followingList ]
	);

	const loadMoreFollowers = React.useCallback(
		() => {
			dispatch({
				type: LOAD_FOLLOWERS_REQUEST,
				offset: followerList.length
			});
		},
		[ followerList ]
	);

	return (
		<React.Fragment>
			<ProfileForm />
			<FollowLists
				header={'Following List'}
				hasMore={hasMoreFollowing}
				loadMore={loadMoreFollowings}
				onClickStop={onUnfollow}
				data={followingList}
			/>
			<FollowLists
				header={'Follower List'}
				hasMore={hasMoreFollower}
				loadMore={loadMoreFollowers}
				onClickStop={onRemoveFollower}
				data={followerList}
			/>
			<React.Fragment>{mainPosts.map((content, index) => <Post key={index} post={content} />)}</React.Fragment>
		</React.Fragment>
	);
};

Profile.getInitialProps = async (context) => {
	const state = context.store.getState();
	context.store.dispatch({
		type: LOAD_FOLLOWERS_REQUEST,
		data: state.user.me && state.user.me.id
	});
	context.store.dispatch({
		type: LOAD_FOLLOWINGS_REQUEST,
		data: state.user.me && state.user.me.id
	});
	context.store.dispatch({
		type: LOAD_USER_POSTS_REQUEST,
		data: state.user.me && state.user.me.id
	});
};

export default Profile;
