import * as React from 'react';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import { useSelector } from 'react-redux';

const Home: React.FunctionComponent = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <React.Fragment>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => {
        return <Post post={post} key={`${post}`} />;
      })}
    </React.Fragment>
  );
};

export default Home;
