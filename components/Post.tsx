import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Card, Button, Avatar, Form, Input, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST } from '../reducers/post';
import { PostProps } from '../pages';

const CoverImg = styled.img`border: 1px solid #f0f0f0;`;

const PostCard = styled(Card)`
  margin-bottom: 20px;
`;

const Post = ({ post }: PostProps): React.ReactElement => {
	const { isAddingComment, addedComment } = useSelector((state) => state.post);
	const { me } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [ commentFormOpened, setCommentFormOpened ] = React.useState<boolean>(false);
	const [ commentText, setCommentText ] = React.useState<string>('');

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

	React.useEffect(
		() => {
			setCommentText('');
		},
		[ addedComment === true ]
	);

	return (
		<React.Fragment>
			<PostCard
				key={post.createdAt}
				cover={post.img && <CoverImg alt="example" src={post.img} />}
				actions={[
					<RetweetOutlined key="retweet" />,
					<HeartOutlined key="heart" />,
					<MessageOutlined key="message" onClick={onToggleComment} />,
					<EllipsisOutlined key="ellipsis" />
				]}
				extra={<Button>Follow</Button>}
			>
				<Card.Meta
					avatar={
						<Link href={{ pathname: `/user`, query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
							<a>
								<Avatar>{post.User.userId[0]}</Avatar>
							</a>
						</Link>
					}
					title={post.User.userId}
					description={
						<div>
							{post.content.split(/(#[^\s]+)/g).map((v, index) => {
								if (v.match(/#[^\s]+/)) {
									return (
										<Link
											href={{ pathname: `/hashtag`, query: { tag: v.slice(1) } }}
											as={`/user/${v.slice(1)}`}
											key={index}
										>
											<a>{v}</a>
										</Link>
									);
								}
								return v;
							})}
						</div>
					}
				/>
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
						renderItem={(item) => (
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
