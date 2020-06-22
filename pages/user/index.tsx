import * as React from 'react';
import Post from '../../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';

type ContextProps = {
  id: number;
};

const User = ({ id }: ContextProps) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);
  React.useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    });
  }, []);
  return (
    <React.Fragment>
      {userInfo ? (
        <Card
          actions={[
            <div key="tweet">
              Tweet
              <br />
              {userInfo.Posts.length}
            </div>,
            <div key="following">
              Following
              <br />
              {userInfo.Followings.length}
            </div>,
            <div key="follower">
              Follower
              <br />
              {userInfo.Followers.length}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.userId[0]}</Avatar>} title={userInfo.userId} />
        </Card>
      ) : null}
      {mainPosts.map((c) => (
        <Post key={c.createdAt} post={c} />
      ))}
    </React.Fragment>
  );
};

User.getInitialProps = async (context) => {
  return { id: parseInt(context.query.id, 10) };
};

export default User;
