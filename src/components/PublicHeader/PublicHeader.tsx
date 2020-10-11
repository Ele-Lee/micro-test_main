import React, { useState } from 'react';
import styled from 'styled-components';
import intersection from 'lodash/intersection';
import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
import {
  ProjectOutlined,
  TeamOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Avatar } from 'antd';
import { useAuth } from './hook/useAuth';

// import { globalHeaderHeight } from 'config/settings';

const { Header } = Layout;
const globalHeaderHeight = 60;

const Trigger = styled.span`
  font-size: 18px;
  line-height: 58px !important;
  padding: 0 16px;
  cursor: pointer;
  transition: color 0.3s;
  float: left;
  &:hover {
    color: #108ee9;
  }
`;

export const UserInfo = styled.div`
  > .avatar {
    margin-right: 10px;
    vertical-align: middle;
  }
`;

interface Props {}

const GlobalHeader = ({}: Props) => {
  const [collapsed, toggleCollapsed] = useState(false);
  const toggle = () => {
    toggleCollapsed(!collapsed);
  };
  const { user } = useAuth();

  const headerStyle = {
    right: 0,
    background: '#fff',
    padding: 0,
    boxShadow: '0 1px 4px rgba(0,21,41,.08)',
    zIndex: 100,
    height: globalHeaderHeight,
  };

  const handleLogout = () => {};

  const hasPermission = (permission: string) =>
    intersection(user.permission, permission).length > 0;

  if (!user) return null;
  return (
    <Header style={headerStyle}>
      {/* {appLogo} */}
      <Trigger
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggle}
      />

      <Menu
        mode="horizontal"
        style={{
          lineHeight: `${globalHeaderHeight}px`,
          height: `${globalHeaderHeight}px`,
          textAlign: 'right',
        }}
        selectedKeys={[]}
      >
        {/* <Menu.Item>
          <div
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              lineHeight: 'normal',
            }}
          >
          </div>
        </Menu.Item> */}

        <Menu.Item>{/* <PatterPageEntry></PatterPageEntry> */}</Menu.Item>

        <Menu.SubMenu
          title={
            <UserInfo>
              {user.avatar_url ? (
                <Avatar src={user.avatar_url} />
              ) : (
                <Avatar
                  style={{
                    backgroundColor: '#f56a00',
                    verticalAlign: 'middle',
                  }}
                >
                  {user.username.slice(0, 1)}
                </Avatar>
              )}
              <span style={{ marginLeft: 10 }}>{user.username}</span>
            </UserInfo>
          }
        >
          <Menu.Item>
            <a href="/profile/base-info">
              {/* <Icon type="project" theme="outlined" />  */}
              <ProjectOutlined />
              个人信息
            </a>
          </Menu.Item>

          {hasPermission([
            '*',
            'portal/user-manage/view_user_manage_module',
          ]) && (
            <Menu.Item>
              <a href="/ram/user-manage/member" target="_black">
                {/* <Icon type="team" theme="outlined" /> 人员管理 */}
                <TeamOutlined />
                人员管理
              </a>
            </Menu.Item>
          )}

          <Menu.Item>
            <a href="/download-center">
              {/* <Icon type="download" theme="outlined" /> 下载中心 */}
              <DownloadOutlined />
              下载中心
            </a>
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item>
            <NavLink to="/wxtool/portal-tag-manage">标签管理</NavLink>
          </Menu.Item>

          <Menu.Item key="logout" onClick={handleLogout}>
            {/* <Icon type="logout" /> */}
            退出登录
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  );
};

export default GlobalHeader;
