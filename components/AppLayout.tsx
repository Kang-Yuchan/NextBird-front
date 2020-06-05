import * as React from 'react';
import { Menu, Input, Button, Row, Col, Card, Avatar } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { NodeProps } from '../interface';

const InputSearch = styled(Input.Search)`
  vertical-align: middle;
`;

const dummy = {
  id: 'kangyuchan',
  Post: [],
  Follwings: [],
  Followers: [],
};

const AppLayout = ({ children }: NodeProps): React.ReactNode => {
  return (
    <React.Fragment>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Next Bird</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <InputSearch enterButton />
        </Menu.Item>
      </Menu>
      <Link href="/signup">
        <a>
          <Button>Sign Up</Button>
        </a>
      </Link>
      <Row>
        <Col xs={24} md={6}>
          <Card
            actions={[
              <div key="tweet">
                Tweet
                <br />
                {dummy.Post.length}
              </div>,
              <div key="following">
                Following
                <br />
                {dummy.Post.length}
              </div>,
              <div key="follower">
                Follower
                <br />
                {dummy.Post.length}
              </div>,
            ]}
          >
            <Card.Meta avatar={<Avatar>{dummy.id[0]}</Avatar>} title={dummy.id} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          3
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AppLayout;
