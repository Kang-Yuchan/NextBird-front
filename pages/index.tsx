import * as React from 'react';
import { PostData } from '../interface';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user';

const dummy: PostData = {
  isLoggedIn: true,
  imagePaths: ['image'],
  mainPosts: [
    {
      img: 'https://blog.f-arts.work/wp-content/uploads/2018/09/nextjs.png.webp',
      User: {
        id: 1,
        name: 'kangyuchan',
      },
      content: 'I love Next.js ♥',
      createdAt: '2020-06-05',
    },
  ],
};

const Home: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    dispatch(loginAction);
    dispatch(logoutAction);
    dispatch(loginAction);
  }, []);

  return (
    <React.Fragment>
      {user ? <div>Log In: {user.name}</div> : <div>You are Logged out</div>}
      {dummy.isLoggedIn && <PostForm postData={dummy} />}
      {dummy.mainPosts.map((post) => {
        return <Post post={post} key={`${post}`} />;
      })}
    </React.Fragment>
  );
};

export default Home;
