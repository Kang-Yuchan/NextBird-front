import * as React from 'react';
import styled from 'styled-components';
import { Images } from '../interface';
import { PlusOutlined } from '@ant-design/icons';

const borderStyle = '1px solid #f0f0f0';

const SingleImg = styled.img`border: ${borderStyle};`;

const DobleImg = styled.img`
	border: ${borderStyle};
	width: 50%;
`;

const OverImgs = styled.div`
	display: inline-block;
	width: 50%;
	text-align: center;
	vertical-align: middle;
`;

interface PostImagesProps {
	images: Array<Images>;
}

const PostImages = ({ images }: PostImagesProps) => {
	if (images.length === 1) {
		return <SingleImg src={`http://localhost:3065/${images[0].src}`} />;
	}
	if (images.length === 2) {
		return (
			<div>
				<DobleImg src={`http://localhost:3065/${images[0].src}`} />
				<DobleImg src={`http://localhost:3065/${images[1].src}`} />
			</div>
		);
	}
	return (
		<div>
			<DobleImg src={`http://localhost:3065/${images[0].src}`} />
			<OverImgs>
				<PlusOutlined />
				<br />
				<span>More view {images.length - 1} photos</span>
			</OverImgs>
		</div>
	);
};

export default PostImages;
