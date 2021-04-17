import React from 'react';
import Sidebar from '../components/molecules/AdminSidebar/AdminSidebar';
import Cabinets from 'components/organism/Cabinets/Cabinets';

import styled from 'styled-components';
import ProtectedRoute from 'ProtectedRoute/ProtectedRoute';

const AdminPanel = () => {
  return (
    <Wrapper>
      <Sidebar />
      <ProtectedRoute exact path="/admin-panel/cabinets" component={Cabinets} isAuth={'admin'} />
    </Wrapper>
  );
};

export default AdminPanel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
