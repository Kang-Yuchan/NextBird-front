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
	const { me, followingList, followerList } = useSelector((state) => state.user);
	const { mainPosts } = useSelector((state) => state.post);

	React.useEffect(
		() => {
			if (me) {
				dispatch({
					type: LOAD_FOLLOWERS_REQUEST,
					data: me.id
				});
				dispatch({
					type: LOAD_FOLLOWINGS_REQUEST,
					data: me.id
				});
				dispatch({
					type: LOAD_USER_POSTS_REQUEST,
					data: me.id
				});
			}
		},
		[ me && me.id ]
	);

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

	return (
		<React.Fragment>
			<ProfileForm />
			<FollowList
				grid={{ gutter: 4, xs: 2, md: 3 }}
				size="small"
				header={<div>Following List</div>}
				loadMore={<ViewMoreBtn>View More</ViewMoreBtn>}
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
				loadMore={<ViewMoreBtn>View More</ViewMoreBtn>}
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

export default Profile;
