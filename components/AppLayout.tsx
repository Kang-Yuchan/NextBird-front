import * as React from 'react';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { NodeProps, UserData } from '../interface';
import LoginForm from '../components/LoginForm';
import UserCard from '../components/UserCard';

const InputSearch = styled(Input.Search)`
  vertical-align: middle;
`;

const dummy: UserData = {
  id: 'kangyuchan',
  Post: [],
  Follwings: [],
  Followers: [],
  isLoggedIn: false,
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
      <Row>
        <Col xs={24} md={6}>
          {dummy.isLoggedIn ? <UserCard userData={dummy} /> : <LoginForm />}
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
