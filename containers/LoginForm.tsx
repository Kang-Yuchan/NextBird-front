import * as React from 'react';
import Link from 'next/link';
import { Input, Button } from 'antd';
import { useInput, UseInputType } from '../pages/signup';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';
import styled from 'styled-components';
import { RootState } from '../reducers';

const Form = styled.form`margin-left: 15px;`;

const InputBox = styled.div`margin-bottom: 10px;`;

const LoginBtn = styled(Button)`
  margin-right: 10px;
`;

const LoginForm: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const { isLoggingIn } = useSelector((state: RootState) => state.user);
	const [ id, onChangeId ]: UseInputType = useInput('');
	const [ password, onChangePassword ]: UseInputType = useInput('');

	const onSubmitForm = React.useCallback(
		(e: React.FormEvent<EventTarget>): void => {
			e.preventDefault();
			dispatch({
				type: LOG_IN_REQUEST,
				data: {
					userId: id,
					password
				}
			});
		},
		[ id, password ]
	);
	return (
		<Form onSubmit={onSubmitForm}>
			<InputBox>
				<label htmlFor="user-id">ID</label>
				<br />
				<Input name="user-id" value={id} onChange={onChangeId} required />
			</InputBox>
			<InputBox>
				<label htmlFor="user-password">Password</label>
				<br />
				<Input name="user-password" value={password} onChange={onChangePassword} type="password" required />
			</InputBox>
			<div>
				<LoginBtn type="primary" htmlType="submit" loading={isLoggingIn}>
					Log In
				</LoginBtn>
				<Link href="/signup">
					<a>
						<Button>Sign Up</Button>
					</a>
				</Link>
			</div>
		</Form>
	);
};

export default LoginForm;
