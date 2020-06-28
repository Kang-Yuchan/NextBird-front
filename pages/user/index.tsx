import * as React from 'react';
import Post from '../../containers/Post';
import { useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { RootState } from '../../reducers';

type ContextProps = {
	id: number;
};

const User = ({ id }: ContextProps) => {
	const { mainPosts } = useSelector((state: RootState) => state.post);
	const { userInfo } = useSelector((state: RootState) => state.user);

	return (
		<React.Fragment>
			{userInfo ? (
				<Card
					actions={[
						<div key="tweet">
							Tweet
							<br />
							{userInfo.Posts}
						</div>,
						<div key="following">
							Following
							<br />
							{userInfo.Followings}
						</div>,
						<div key="follower">
							Follower
							<br />
							{userInfo.Followers}
						</div>
					]}
				>
					<Card.Meta avatar={<Avatar>{userInfo.userId[0]}</Avatar>} title={userInfo.userId} />
				</Card>
			) : null}
			{mainPosts.map((c) => <Post key={c.createdAt} post={c} />)}
		</React.Fragment>
	);
};

User.getInitialProps = async (context) => {
	const id = parseInt(context.query.id, 10);
	context.store.dispatch({
		type: LOAD_USER_REQUEST,
		data: id
	});
	context.store.dispatch({
		type: LOAD_USER_POSTS_REQUEST,
		data: id
	});
	return { id };
};

export default User;
