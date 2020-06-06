import * as React from 'react';
import styled from 'styled-components';
import { Button, List, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import ProfileForm from '../components/ProfileForm';

const FollowList = styled(List)`
  margin-bottom: 20px;
`;

const FollowerList = styled(List)`
  margin-bottom: 20px;
`;

const ViewMoreBtn = styled(Button)`
  width: 100%;
`;

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;

const Profile: React.ReactNode = () => {
  return (
    <React.Fragment>
      <ProfileForm />
      <FollowList
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>Following List</div>}
        loadMore={<ViewMoreBtn>View More</ViewMoreBtn>}
        bordered
        dataSource={['miku', 'yumemi', 'Next Bird Official']}
        renderItem={(item) => (
          <ListItem>
            <Card actions={[<StopOutlined key="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </ListItem>
        )}
      />
      <FollowerList
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>Follower List</div>}
        loadMore={<ViewMoreBtn>View More</ViewMoreBtn>}
        bordered
        dataSource={['miku', 'yumemi', 'Next Bird Official']}
        renderItem={(item) => (
          <ListItem>
            <Card actions={[<StopOutlined key="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </ListItem>
        )}
      />
    </React.Fragment>
  );
};

export default Profile;
