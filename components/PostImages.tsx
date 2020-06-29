import * as React from 'react';
import styled from 'styled-components';
import { Images } from '../interface';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './ImagesZoom';

const borderStyle = '1px solid #f0f0f0';

const SingleImg = styled.img`border: ${borderStyle};`;

const DobleImg = styled.img`
	border-right: ${borderStyle};
	width: 50%;
`;

const BorderDiv = styled.div`border: ${borderStyle};`;

const OverTripleImgs = styled.div`
	display: inline-block;
	width: 50%;
	text-align: center;
	vertical-align: middle;
`;

interface PostImagesProps {
	images: Array<Images>;
}

const PostImages = ({ images }: PostImagesProps): React.ReactElement => {
	const [ showImagesZoom, setShowImagesZoom ] = React.useState<boolean>(false);

	const onZoom = React.useCallback(() => {
		setShowImagesZoom(true);
	}, []);

	const onClose = React.useCallback(() => {
		setShowImagesZoom(false);
	}, []);

	if (images.length === 1) {
		return (
			<React.Fragment>
				<SingleImg src={images[0].src.replace(/original\//, 'thumb/')} onClick={onZoom} />
				{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
			</React.Fragment>
		);
	}
	if (images.length === 2) {
		return (
			<React.Fragment>
				<BorderDiv>
					<DobleImg src={images[0].src.replace(/original\//, 'thumb/')} onClick={onZoom} />
					<DobleImg src={images[1].src.replace(/original\//, 'thumb/')} onClick={onZoom} />
				</BorderDiv>
				{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
			<BorderDiv>
				<DobleImg src={images[0].src.replace(/original\//, 'thumb/')} onClick={onZoom} />
				<OverTripleImgs onClick={onZoom}>
					<PlusOutlined />
					<br />
					<span>More view {images.length - 1} photos</span>
				</OverTripleImgs>
			</BorderDiv>
			{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
		</React.Fragment>
	);
};

export default PostImages;
