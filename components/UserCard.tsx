import * as React from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserCard = (): React.ReactElement => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const onLogOut = React.useCallback(() => {
		dispatch({
			type: LOG_OUT_REQUEST
		});
	}, []);
	return (
		<Card
			actions={[
				<div key="tweet">
					Tweet
					<br />
					{me.Posts.length}
				</div>,
				<div key="following">
					Following
					<br />
					{me.Followings.length}
				</div>,
				<div key="follower">
					Follower
					<br />
					{me.Followers.length}
				</div>
			]}
		>
			<Card.Meta avatar={<Avatar>{me.userId[0]}</Avatar>} title={me.userId} />
			<Button onClick={onLogOut}>Log Out</Button>
		</Card>
	);
};

export default UserCard;
