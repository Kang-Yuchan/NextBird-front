import * as React from 'react';
import { Input, Button, Card, Avatar } from 'antd';
import styled from 'styled-components';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

const Form = styled.form`
  margin-bottom: 20px;
`;

const TweetBtn = styled(Button)`
  float: right;
`;

const ImgDiv = styled.div`
  display: inline-block;
`;

const Img = styled.img`
  width: 200px;
`;

const CoverImg = styled.img`
  border: 1px solid #f0f0f0;
`;

const dummy = {
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
      <div>
        {dummy.isLoggedIn && (
          <Form encType="multipart/form-data">
            <Input.TextArea maxLength={140} placeholder="Let's Tweet!!"></Input.TextArea>
            <div>
              <input type="file" multiple hidden />
              <Button>Upload Image</Button>
              <TweetBtn type="primary" htmlType="submit">
                Tweet
              </TweetBtn>
            </div>
            <div>
              {dummy.imagePaths.map(
                (v: string): React.ReactElement => {
                  return (
                    <ImgDiv key={v}>
                      <Img src={`http://localhost:3065/` + v} alt={v} />
                      <div>
                        <Button>Delete</Button>
                      </div>
                    </ImgDiv>
                  );
                },
              )}
            </div>
          </Form>
        )}
        {dummy.mainPosts.map((c) => {
          return (
            <Card
              key={c.createdAt}
              cover={c.img && <CoverImg alt="example" src={c.img} />}
              actions={[
                <RetweetOutlined key="retweet" />,
                <HeartOutlined key="heart" />,
                <MessageOutlined key="message" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
              extra={<Button>Follow</Button>}
            >
              <Card.Meta
                avatar={<Avatar>{c.User.name[0]}</Avatar>}
                title={c.User.name}
                description={c.content}
              />
            </Card>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Home;
