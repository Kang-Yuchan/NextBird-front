import * as React from 'react';
import styled from 'styled-components';
import { Button, List, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import ProfileForm from '../components/ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWINGS_REQUEST,
	UNFOLLOW_USER_REQUEST,
	REMOVE_FOLLOWER_REQUEST
} from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import Post from '../components/Post';
import { FollowItem } from '../interface';

const FollowList = styled(List)`
  margin-bottom: 20px;
`;

const FollowerList = styled(List)`
  margin-bottom: 20px;
`;

const ViewMoreBtn = styled(Button)`
  width: 100%;
`;

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;

const Profile: React.ReactNode = () => {
	const dispatch = useDispatch();
	const { followingList, followerList, hasMoreFollower, hasMoreFollowing } = useSelector((state) => state.user);
	const { mainPosts } = useSelector((state) => state.post);

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
			<FollowList
				grid={{ gutter: 4, xs: 2, md: 3 }}
				size="small"
				header={<div>Following List</div>}
				loadMore={hasMoreFollowing && <ViewMoreBtn onClick={loadMoreFollowings}>View More</ViewMoreBtn>}
				bordered
				dataSource={followingList}
				renderItem={(item: FollowItem) => (
					<ListItem>
						<Card actions={[ <StopOutlined key="stop" onClick={onUnfollow(item.id)} /> ]}>
							<Card.Meta description={item.userId} />
						</Card>
					</ListItem>
				)}
			/>
			<FollowerList
				grid={{ gutter: 4, xs: 2, md: 3 }}
				size="small"
				header={<div>Follower List</div>}
				loadMore={hasMoreFollower && <ViewMoreBtn onClick={loadMoreFollowers}>View More</ViewMoreBtn>}
				bordered
				dataSource={followerList}
				renderItem={(item: FollowItem) => (
					<ListItem>
						<Card actions={[ <StopOutlined key="stop" onClick={onRemoveFollower(item.id)} /> ]}>
							<Card.Meta description={item.userId} />
						</Card>
					</ListItem>
				)}
			/>
			<React.Fragment>{mainPosts.map((c) => <Post key={c.createdAt} post={c} />)}</React.Fragment>
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
