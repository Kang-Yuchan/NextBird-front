import * as React from 'react';
import styled from 'styled-components';
import { Card, Button, Avatar } from 'antd';
import { MainPost } from '../interface';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

const CoverImg = styled.img`
  border: 1px solid #f0f0f0;
`;

type PostProps = {
  post: MainPost;
};

const Post = ({ post }: PostProps): React.ReactElement => {
  return (
    <Card
      key={post.createdAt}
      cover={post.img && <CoverImg alt="example" src={post.img} />}
      actions={[
        <RetweetOutlined key="retweet" />,
        <HeartOutlined key="heart" />,
        <MessageOutlined key="message" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
      extra={<Button>Follow</Button>}
    >
      <Card.Meta
        avatar={<Avatar>{post.User.name[0]}</Avatar>}
        title={post.User.name}
        description={post.content}
      />
    </Card>
  );
};

export default Post;
