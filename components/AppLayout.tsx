import * as React from 'react';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { NodeProps } from '../interface';
import LoginForm from '../components/LoginForm';
import UserCard from '../components/UserCard';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const InputSearch = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }: NodeProps): React.ReactNode => {
	const { me } = useSelector((state) => state.user);

	const onSearch = (value) => {
		Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
	};

	return (
		<React.Fragment>
			<Menu mode="horizontal">
				<Menu.Item key="home">
					<Link href="/">
						<a>Next Bird</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="profile">
					<Link href="/profile" prefetch>
						<a>Profile</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="mail">
					<InputSearch enterButton onSearch={onSearch} />
				</Menu.Item>
			</Menu>
			<Row gutter={10}>
				<Col xs={24} md={6}>
					{me ? <UserCard /> : <LoginForm />}
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					<a target="_blank" rel="noreferrer" href="https://github.com/Kang-Yuchan">
						Made by Kang Yuchan
					</a>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default AppLayout;
