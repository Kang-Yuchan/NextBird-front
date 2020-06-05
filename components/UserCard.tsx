import * as React from 'react';
import { Card, Avatar } from 'antd';
import { UserCardProps } from '../interface';

const UserCard = ({ userData }: UserCardProps): React.ReactElement => {
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
      <Card.Meta avatar={<Avatar>{userData.id[0]}</Avatar>} title={userData.id} />
    </Card>
  );
};

export default UserCard;
