import * as React from 'react';
import styled from 'styled-components';
import { Card, Button, Avatar, Form, Input, List, Comment } from 'antd';
import { MainPost } from '../interface';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CoverImg = styled.img`
  border: 1px solid #f0f0f0;
`;

type PostProps = {
  post: MainPost;
};

const Post = ({ post }: PostProps): React.ReactElement => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = React.useState<boolean>(false);
  const [commentText, setCommentText] = React.useState<string>('');

  const onSubmitComment = React.useCallback((e) => {
    e.preventDefault();
    if (!me) {
      return alert('Please log in.');
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
    });
  }, []);

  const onToggleComment = React.useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onChangeComment = React.useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <React.Fragment>
      <Card
        key={post.createdAt}
        cover={post.img && <CoverImg alt="example" src={post.img} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          <HeartOutlined key="heart" />,
          <MessageOutlined key="message" onClick={onToggleComment} />,
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
      {commentFormOpened && (
        <React.Fragment>
          <form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeComment} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Tweet
            </Button>
          </form>
          <List
            header={`${post.comments ? post.comments.length : 0} Comments`}
            itemLayout="horizontal"
            dataSource={post.comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.name}
                  avatar={<Avatar>{item.User.name[0]}</Avatar>}
                  content={item.content}
                  datetime={item.createdAt}
                />
              </li>
            )}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Post;
