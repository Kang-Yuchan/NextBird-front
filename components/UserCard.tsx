import * as React from 'react';
import { Card, Avatar, Button } from 'antd';
import { UserCardProps } from '../interface';
import { useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserCard = ({ userData }: UserCardProps): React.ReactElement => {
  const dispatch = useDispatch();
  const onLogOut = React.useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);
  return (
    <Card
      actions={[
        <div key="tweet">
          Tweet
          <br />
          {userData.Posts.length}
        </div>,
        <div key="following">
          Following
          <br />
          {userData.Followings.length}
        </div>,
        <div key="follower">
          Follower
          <br />
          {userData.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{userData.userId[0]}</Avatar>} title={userData.userId} />
      <Button onClick={onLogOut}>Log Out</Button>
    </Card>
  );
};

export default UserCard;
