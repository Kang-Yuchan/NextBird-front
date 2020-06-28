import * as React from 'react';
import styled from 'styled-components';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { FollowItem } from '../interface';

const FollowList = styled(List)`
  margin-bottom: 20px;
`;

const ViewMoreBtn = styled(Button)`
	width: 100%;
	border: 0px;
`;

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;

interface FollowListProps {
	header: string;
	hasMore: boolean;
	loadMore: () => void;
	onClickStop: (id: number) => () => void;
	data: Array<FollowItem>;
}

const FollowLists = ({ header, hasMore, data, loadMore, onClickStop }: FollowListProps): React.ReactElement => {
	return (
		<FollowList
			grid={{ gutter: 4, xs: 2, md: 3 }}
			size="small"
			header={<div>{header}</div>}
			loadMore={hasMore && <ViewMoreBtn onClick={loadMore}>View More</ViewMoreBtn>}
			bordered
			dataSource={data}
			renderItem={(item: FollowItem) => (
				<ListItem>
					<Card actions={[ <StopOutlined key="stop" onClick={onClickStop(item.id)} /> ]}>
						<Card.Meta description={item.userId} />
					</Card>
				</ListItem>
			)}
		/>
	);
};

export default FollowLists;
