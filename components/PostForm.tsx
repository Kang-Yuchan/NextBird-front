import * as React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/post';

const Form = styled.form`margin-bottom: 20px;`;

const TweetTextArea = styled(Input.TextArea)`
  margin-bottom: 20px;
`;

const TweetBtn = styled(Button)`
  float: right;
`;

const ImgDiv = styled.div`display: inline-block;`;

const Img = styled.img`width: 200px;`;

const PostForm = (): React.ReactElement => {
	const dispatch = useDispatch();
	const [ text, setText ] = React.useState<string>('');
	const { imagePaths, isAddingPost, addedPost } = useSelector((state) => state.post);
	const imageInput = React.useRef(null);

	React.useEffect(
		() => {
			setText('');
		},
		[ addedPost === true ]
	);

	const onSubmitForm = React.useCallback(
		(e) => {
			e.preventDefault();
			if (!text || !text.trim()) {
				return alert('Write post text!');
			}
			dispatch({
				type: ADD_POST_REQUEST,
				data: {
					content: text.trim()
				}
			});
		},
		[ text ]
	);

	const onChangeText = React.useCallback((e) => {
		setText(e.target.value);
	}, []);

	const onChangeImages = React.useCallback((e) => {
		console.log(e.target.files);
		const imageFormData = new FormData();
		[].forEach.call(e.target.files, (f) => {
			imageFormData.append('image', f);
		});
		dispatch({
			type: UPLOAD_IMAGES_REQUEST,
			data: imageFormData
		});
	}, []);

	const onClickImageUpload = React.useCallback(
		() => {
			imageInput.current.click();
		},
		[ imageInput.current ]
	);

	return (
		<Form encType="multipart/form-data" onSubmit={onSubmitForm}>
			<TweetTextArea maxLength={140} placeholder="Let's Tweet!!" value={text} onChange={onChangeText} />
			<div>
				<input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
				<Button onClick={onClickImageUpload}>Upload Image</Button>
				<TweetBtn type="primary" htmlType="submit" loading={isAddingPost}>
					Tweet
				</TweetBtn>
			</div>
			<div>
				{imagePaths.map((v: string): React.ReactElement => (
					<ImgDiv key={v}>
						<Img src={`http://localhost:3065/${v}`} alt={v} />
						<div>
							<Button>Delete</Button>
						</div>
					</ImgDiv>
				))}
			</div>
		</Form>
	);
};
export default PostForm;
