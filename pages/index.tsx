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
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
  }, []);

  return (
    <React.Fragment>
      {me && <PostForm />}
      {mainPosts.map((post: PostProps, index: number) => {
        return <Post post={post} key={index} />;
      })}
    </React.Fragment>
  );
};

export default Home;
