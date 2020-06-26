import * as React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_ID_REQUEST } from '../reducers/user';

const Form = styled.form`
	margin-bottom: 20px;
	border: 1px solid #d9d9d9;
	padding: 20px;
`;

const IdInput = styled(Input)`
  margin-bottom: 10px;
`;

const ProfileForm = (): React.ReactElement => {
	const [ editId, setEditId ] = React.useState('');
	const dispatch = useDispatch();
	const { me, isEditingId } = useSelector((state) => state.user);

	const onChangeId = React.useCallback((e) => {
		setEditId(e.target.value);
	}, []);

	const onEditId = React.useCallback(
		(e: React.FormEvent<EventTarget>): void => {
			e.preventDefault();
			dispatch({
				type: EDIT_ID_REQUEST,
				data: editId
			});
		},
		[ editId ]
	);

	return (
		<Form onSubmit={onEditId}>
			<IdInput addonBefore="ID" value={editId || (me && me.userId)} onChange={onChangeId} />
			<Button type="primary" htmlType="submit" loading={isEditingId}>
				Edit
			</Button>
		</Form>
	);
};

export default ProfileForm;
