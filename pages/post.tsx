import * as React from 'react';
import { useSelector } from 'react-redux';
import { LOAD_POST_REQUEST } from '../reducers/post';

interface PostProps {
	id: number;
}

const Post = ({ id }: PostProps) => {
	const { singlePost } = useSelector((state) => state.post);
	return (
		<React.Fragment>
			<div>{singlePost.content}</div>
			<div>{singlePost.User.userId}</div>
			<div>{singlePost.Images[0] && <img src={`http://localhost:3065/${singlePost.Images[0].src}`} />}</div>
		</React.Fragment>
	);
};

Post.getInitialProps = async (context) => {
	context.store.dispatch({
		type: LOAD_POST_REQUEST,
		data: context.query.id
	});
	return { id: parseInt(context.query.id, 10) };
};

export default Post;
