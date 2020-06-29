import * as React from 'react';
import { useSelector } from 'react-redux';
import { LOAD_POST_REQUEST } from '../reducers/post';
import { Helmet } from 'react-helmet';
import { RootState } from '../reducers';

interface PostProps {
	id: number;
}

const Post = ({ id }: PostProps) => {
	const { singlePost } = useSelector((state: RootState) => state.post);
	return (
		<React.Fragment>
			<Helmet
				title={`${singlePost.User.userId}'s post`}
				description={singlePost.content}
				meta={[
					{
						name: 'description',
						content: singlePost.content
					},
					{
						property: 'og:title',
						content: `${singlePost.User.userId}'s post`
					},
					{
						property: 'og:description',
						content: singlePost.content
					},
					{
						property: 'og:image',
						content: singlePost.Images[0] ? singlePost.Images[0].src : 'http://nextbird.site/birdlogo.png'
					},
					{
						property: 'og:url',
						content: `http://nextbird.site/post/${id}`
					}
				]}
			/>
			<div>{singlePost.content}</div>
			<div>{singlePost.User.userId}</div>
			<div>{singlePost.Images[0] && <img src={singlePost.Images[0].src} />}</div>
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
