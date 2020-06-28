import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import { RetweetOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
	LOAD_COMMENTS_REQUEST,
	UNLIKE_POST_REQUEST,
	LIKE_POST_REQUEST,
	RETWEET_REQUEST,
	REMOVE_POST_REQUEST
} from '../reducers/post';
import { PostProps } from '../pages';
import { CommentItem } from '../interface';
import PostImages from '../components/PostImages';
import PostCardContent from '../components/PostCardContent';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';
import { RootState } from '../reducers';
import CommentForm from './CommentForm';
import FollowButton from '../components/FollowButton';

const PostCard = styled(Card)`
  margin-bottom: 20px;
`;

const Post = React.memo(({ post }: PostProps): React.ReactElement => {
	const id = useSelector((state: RootState) => state.user.me && state.user.me.id);
	const dispatch = useDispatch();
	const [ commentFormOpened, setCommentFormOpened ] = React.useState<boolean>(false);

	const liked = id && post.Likers && post.Likers.find((v) => v.id == id);

	const onRetweet = React.useCallback(
		() => {
			if (!id) {
				return alert('Please log in.');
			}
			return dispatch({
				type: RETWEET_REQUEST,
				data: post.id
			});
		},
		[ id, post && post.id ]
	);

	const onToggleComment = React.useCallback(() => {
		setCommentFormOpened((prev) => !prev);
		if (!commentFormOpened) {
			dispatch({
				type: LOAD_COMMENTS_REQUEST,
				data: post.id
			});
		}
	}, []);

	const onToggleLike = React.useCallback(
		() => {
			if (!id) {
				return alert('Please log in.');
			}
			if (liked) {
				return dispatch({
					type: UNLIKE_POST_REQUEST,
					data: post.id
				});
			} else {
				return dispatch({
					type: LIKE_POST_REQUEST,
					data: post.id
				});
			}
		},
		[ id, post && post.id, liked ]
	);

	const onFollow = React.useCallback(
		(userId) => () => {
			dispatch({
				type: FOLLOW_USER_REQUEST,
				data: userId
			});
		},
		[]
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

	const onRemovePost = React.useCallback(
		(userId) => () => {
			dispatch({
				type: REMOVE_POST_REQUEST,
				data: userId
			});
		},
		[]
	);

	return (
		<React.Fragment>
			<PostCard
				key={post.createdAt}
				cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined key="retweet" onClick={onRetweet} />,
					liked ? (
						<HeartTwoTone key="heart" onClick={onToggleLike} twoToneColor="#eb2f96" />
					) : (
						<HeartOutlined key="heart" onClick={onToggleLike} />
					),
					<MessageOutlined key="message" onClick={onToggleComment} />,
					<Popover
						key="ellipsis"
						content={
							<Button.Group>
								{id && post.UserId === id ? (
									<React.Fragment>
										<Button>Edit</Button>
										<Button danger onClick={onRemovePost(post.id)}>
											Delete
										</Button>
									</React.Fragment>
								) : (
									<Button>Report</Button>
								)}
							</Button.Group>
						}
					>
						<EllipsisOutlined />
					</Popover>
				]}
				title={post.RetweetId ? `${post.User.userId} retweet this post.` : null}
				extra={<FollowButton post={post} onFollow={onFollow} onUnfollow={onUnfollow} />}
			>
				{post.RetweetId && post.Retweet ? (
					<Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
						<Card.Meta
							avatar={
								<Link
									href={{ pathname: `/user`, query: { id: post.Retweet.User.id } }}
									as={`/user/${post.Retweet.User.id}`}
								>
									<a>
										<Avatar>{post.Retweet.User.userId[0]}</Avatar>
									</a>
								</Link>
							}
							title={post.Retweet.User.userId}
							description={<PostCardContent postData={post.Retweet.content} />}
						/>
					</Card>
				) : (
					<Card.Meta
						avatar={
							<Link
								href={{ pathname: `/user`, query: { id: post.User.id } }}
								as={`/user/${post.User.id}`}
							>
								<a>
									<Avatar>{post.User.userId[0]}</Avatar>
								</a>
							</Link>
						}
						title={post.User.userId}
						description={<PostCardContent postData={post.content} />}
					/>
				)}
			</PostCard>
			{commentFormOpened && (
				<React.Fragment>
					<CommentForm post={post} />
					<List
						header={`${post.Comments ? post.Comments.length : 0} Comments`}
						itemLayout="horizontal"
						dataSource={post.Comments || []}
						renderItem={(item: CommentItem) => (
							<li>
								<Comment
									author={item.User.userId}
									avatar={
										<Link
											href={{ pathname: `/user`, query: { id: item.User.id } }}
											as={`/user/${item.User.id}`}
										>
											<a>
												<Avatar>{item.User.userId[0]}</Avatar>
											</a>
										</Link>
									}
									content={item.content}
								/>
							</li>
						)}
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
});

export default Post;
