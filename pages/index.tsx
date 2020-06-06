import * as React from 'react';
import { PostData } from '../interface';
import PostForm from '../components/PostForm';
import Post from '../components/Post';

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
  return (
    <React.Fragment>
      {dummy.isLoggedIn && <PostForm postData={dummy} />}
      {dummy.mainPosts.map((post) => {
        return <Post post={post} key={`${post}`} />;
      })}
    </React.Fragment>
  );
};

export default Home;
