import * as React from 'react';
import Slick from 'react-slick';
import { CloseOutlined } from '@ant-design/icons';
import { Images } from '../interface';
import styled from 'styled-components';

const ManyImages = styled.div`
	position: fixed;
	z-index: 5000;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

const Header = styled.header`
	height: 44px;
	background: white;
	position: relative;
	padding: 0;
	text-align: center;
`;

const HeaderText = styled.h1`
	margin: 0;
	font-size: 17px;
	color: #333;
	line-height: 44px;
`;

const CloseIcon = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

const Background = styled.div`
	height: calc(100% - 44px);
	background: #090909;
`;

const ImageBox = styled.div`
	padding: 32px;
	text-align: center;
`;

const Image = styled.img`
	margin: 0 auto;
	max-height: 750px;
`;

const SlideStateBox = styled.div`text-align: center;`;

const SlideState = styled.div`
	width: 75px;
	height: 30px;
	line-height: 30px;
	border-radius: 15px;
	background: #313131;
	display: inline-block;
	text-align: center;
	color: white;
	font-size: 15px;
`;

interface ImagesZoomProps {
	images: Array<Images>;
	onClose: () => void;
}

const ImagesZoom = ({ images, onClose }: ImagesZoomProps): React.ReactElement => {
	const [ currentSlide, setCurrentSlide ] = React.useState<number>(0);

	return (
		<ManyImages>
			<Header>
				<HeaderText>Detail images</HeaderText>
				<CloseIcon onClick={onClose} />
			</Header>
			<Background>
				<div>
					<Slick
						initialSlide={0}
						afterChange={(slide) => setCurrentSlide(slide)}
						infinite={false}
						arrows
						slidesToShow={1}
						slidesToScroll={1}
					>
						{images.map((v, i) => {
							return (
								<ImageBox key={i}>
									<Image src={`http://localhost:3065/${v.src}`} />
								</ImageBox>
							);
						})}
					</Slick>
					<SlideStateBox>
						<SlideState>
							{currentSlide + 1} / {images.length}
						</SlideState>
					</SlideStateBox>
				</div>
			</Background>
		</ManyImages>
	);
};

export default ImagesZoom;
