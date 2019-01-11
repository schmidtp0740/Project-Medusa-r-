import React, {Component} from 'react';
import logo from '../../theme/images/logo.png';
import UserConsole from './UserConsole';
import {Layout, Menu} from 'antd';
import {contentStyles, medusa, headStyles} from '../../theme/styles';

const {Header, Content} = Layout;

class UserNav extends Component {
  render() {
    return (
      <Layout>
        <Header style={headStyles}>
          <img src={logo} alt="" style={medusa}/>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys="1"
            style={{
              marginTop: '-12px',
              lineHeight: '80px',
              float: 'left',
              backgroundColor: '#DEE0E0'
          }}>
            <Menu.Item key="1">User Console</Menu.Item>
          </Menu>

          <Menu
            mode="horizontal"
            style={{
              marginTop: '-12px',
              lineHeight: '80px',
            float: 'right'
          }}>
            <Menu.Item key="1">Logout</Menu.Item>
          </Menu>
        </Header>
        <Content style={contentStyles}>
          <UserConsole/>
        </Content>
      </Layout>
    );
  }
}

export default UserNav;