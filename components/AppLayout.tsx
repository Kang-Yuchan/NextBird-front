import * as React from 'react';
import { Menu, Input, Button } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';

const InputSearch = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  return (
    <div>
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
      {children}
    </div>
  );
};

export default AppLayout;
