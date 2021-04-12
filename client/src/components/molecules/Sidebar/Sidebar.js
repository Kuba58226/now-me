import React from 'react';
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './Sidebar.style';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="specialist">Specialist</SidebarLink>
          <SidebarLink to="Discover">Discover</SidebarLink>
          <SidebarLink to="About">About</SidebarLink>
          <SidebarLink to="page">Page</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/sign-in">Sign In</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
