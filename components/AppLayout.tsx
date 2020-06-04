import * as React from 'react';
import { Menu, Input, Button } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { NodeProps } from '../interface';

const InputSearch = styled(Input.Search)`
  vertical-align: middle;
`;

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
      {children}
    </React.Fragment>
  );
};

export default AppLayout;
