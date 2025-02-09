import React, { useState } from 'react';
import "./index.scss"

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ProfileOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content, Footer} = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate()

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '/main/home',
              icon: <HomeOutlined />,
              label: 'Home',
              onClick: function({key}){
                navigate(key)
              }
            },
            {
              key: '/main/article',
              icon: <ProfileOutlined />,
              label: 'Article',
              onClick: function({key}){
                navigate(key)
              }
            },
            {
              key: '/main/publish',
              icon: <PlusCircleOutlined />,
              label: 'Publish',
              onClick: function({key}){
                navigate(key)
              }
            },
            {
              key: '/login',
              icon: <LogoutOutlined />,
              label: 'Log out',
              onClick: function({key}){
                localStorage.removeItem("user")
                navigate(key)
              }
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '77vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
