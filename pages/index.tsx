import * as React from 'react';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import { MainPost } from '../interface';

export type PostProps = {
	post: MainPost;
};

const Home: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const { mainPosts } = useSelector((state) => state.post);

	const onScroll = React.useCallback(
		() => {
			if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
				dispatch({
					type: LOAD_MAIN_POSTS_REQUEST,
					lastId: mainPosts[mainPosts.length - 1].id
				});
			}
		},
		[ mainPosts.length ]
	);

	React.useEffect(
		() => {
			window.addEventListener('scroll', onScroll);
			return () => {
				window.removeEventListener('scroll', onScroll);
			};
		},
		[ mainPosts ]
	);

	return (
		<React.Fragment>
			{me && <PostForm />}
			{mainPosts.map((post: PostProps, index: number) => {
				return <Post post={post} key={index} />;
			})}
		</React.Fragment>
	);
};

Home.getInitialProps = async (context) => {
	context.store.dispatch({
		type: LOAD_MAIN_POSTS_REQUEST
	});
};

export default Home;
