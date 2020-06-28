import * as React from 'react';
import { MainPost } from '../interface';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface FollowButtonProps {
	post: MainPost;
	onFollow: (id: number) => () => void;
	onUnfollow: (id: number) => () => void;
}

const FollowButton = React.memo(({ post, onFollow, onUnfollow }: FollowButtonProps) => {
	const { me } = useSelector((state: RootState) => state.user);
	return !me || post.User.id === me.id ? null : me.Followings && me.Followings.find((v) => v.id === post.User.id) ? (
		<Button onClick={onUnfollow(post.User.id)}>Unfollow</Button>
	) : (
		<Button onClick={onFollow(post.User.id)}>Follow</Button>
	);
});

export default FollowButton;
