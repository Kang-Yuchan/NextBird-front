import * as React from 'react';
import Post from '../../components/Post';
import { useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';

type ContextProps = {
	tag: string | number;
};

const Hashtag = ({ tag }: ContextProps) => {
	const { mainPosts } = useSelector((state) => state.post);

	return <React.Fragment>{mainPosts.map((c) => <Post key={c.createdAt} post={c} />)}</React.Fragment>;
};

Hashtag.getInitialProps = async (context) => {
	const tag = context.query.tag;
	context.store.dispatch({
		type: LOAD_HASHTAG_POSTS_REQUEST,
		data: tag
	});
	return { tag };
};

export default Hashtag;
