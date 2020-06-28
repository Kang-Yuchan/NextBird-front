import * as React from 'react';
import { RootState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';
import { Form, Button, Input } from 'antd';
import { MainPost } from '../interface';

interface CommentFormProps {
	post: MainPost;
}

const CommentForm = ({ post }: CommentFormProps): React.ReactElement => {
	const [ commentText, setCommentText ] = React.useState<string>('');
	const dispatch = useDispatch();
	const { me } = useSelector((state: RootState) => state.user);
	const { isAddingComment, addedComment } = useSelector((state: RootState) => state.post);

	React.useEffect(
		() => {
			setCommentText('');
		},
		[ addedComment === true ]
	);

	const onChangeComment = React.useCallback((e) => {
		setCommentText(e.target.value);
	}, []);

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

	return (
		<form onSubmit={onSubmitComment}>
			<Form.Item>
				<Input.TextArea rows={4} value={commentText} onChange={onChangeComment} />
			</Form.Item>
			<Button type="primary" htmlType="submit" loading={isAddingComment}>
				✉️
			</Button>
		</form>
	);
};

export default CommentForm;
