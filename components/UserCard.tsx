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
          {userData.Post.length}
        </div>,
        <div key="following">
          Following
          <br />
          {userData.Post.length}
        </div>,
        <div key="follower">
          Follower
          <br />
          {userData.Post.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{userData.name[0]}</Avatar>} title={userData.name} />
      <Button onClick={onLogOut}>Log Out</Button>
    </Card>
  );
};

export default UserCard;
