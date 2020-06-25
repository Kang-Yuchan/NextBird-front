import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Card, Button, Avatar, Form, Input, List, Comment, Popover } from 'antd';
import { RetweetOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
	ADD_COMMENT_REQUEST,
	LOAD_COMMENTS_REQUEST,
	UNLIKE_POST_REQUEST,
	LIKE_POST_REQUEST,
	RETWEET_REQUEST
} from '../reducers/post';
import { PostProps } from '../pages';
import { CommentItem } from '../interface';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';

const PostCard = styled(Card)`
  margin-bottom: 20px;
`;

const Post = ({ post }: PostProps): React.ReactElement => {
	const { isAddingComment, addedComment } = useSelector((state) => state.post);
	const { me } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [ commentFormOpened, setCommentFormOpened ] = React.useState<boolean>(false);
	const [ commentText, setCommentText ] = React.useState<string>('');

	const liked = me && post.Likers && post.Likers.find((v) => v.id == me.id);

	React.useEffect(
		() => {
			setCommentText('');
		},
		[ addedComment === true ]
	);

	const onSubmitComment = React.useCallback(
		(e) => {
			e.preventDefault();
			if (!me) {
				return alert('Please log in.');
			}
			return dispatch({
				type: ADD_COMMENT_REQUEST,
				data: {
					postId: post.id,
					content: commentText
				}
			});
		},
		[ me && me.id, commentText ]
	);

	const onRetweet = React.useCallback(
		() => {
			if (!me) {
				return alert('Please log in.');
			}
			return dispatch({
				type: RETWEET_REQUEST,
				data: post.id
			});
		},
		[ me && me.id, post && post.id ]
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

	const onChangeComment = React.useCallback((e) => {
		setCommentText(e.target.value);
	}, []);

	const onToggleLike = React.useCallback(
		() => {
			if (!me) {
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
		[ me && me.id, post && post.id, liked ]
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
								{me && post.UserId === me.id ? (
									<React.Fragment>
										<Button>Edit</Button>
										<Button type="ghost">Delete</Button>
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
				extra={<Button>Follow</Button>}
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
					<form onSubmit={onSubmitComment}>
						<Form.Item>
							<Input.TextArea rows={4} value={commentText} onChange={onChangeComment} />
						</Form.Item>
						<Button type="primary" htmlType="submit" loading={isAddingComment}>
							✉️
						</Button>
					</form>
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
};

export default Post;
