import * as React from 'react';
import Post from '../../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';

type ContextProps = {
	tag: string | number;
};

const Hashtag = ({ tag }: ContextProps) => {
	const dispatch = useDispatch();
	const { mainPosts } = useSelector((state) => state.post);

	const onScroll = React.useCallback(
		() => {
			if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
				dispatch({
					type: LOAD_HASHTAG_POSTS_REQUEST,
					lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
					data: tag
				});
			}
		},
		[ mainPosts ]
	);

	React.useEffect(
		() => {
			window.addEventListener('scroll', onScroll);
			return () => {
				window.removeEventListener('scroll', onScroll);
			};
		},
		[ mainPosts.length, tag ]
	);

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
