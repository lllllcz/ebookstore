import React from "react";
import {Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import {DollarCircleOutlined, HomeOutlined, UserAddOutlined, UserOutlined, WalletOutlined} from "@ant-design/icons";

const linkStyle = {
  color:'white',
  margin:'0 15px',
}

class Toolbar extends React.Component {
  render() {
    const items1 = [
      {
        key: '0',
        label: (<Link to="/" style={linkStyle} ><HomeOutlined /> E Bookstore</Link>)
      },
      {
        key: '1',
        label: (<Link to="/login" style={linkStyle} ><UserOutlined /> 登录</Link>)
      },
      {
        key: '2',
        label: (<Link to="/" style={linkStyle} ><UserAddOutlined /> 注册</Link>)
      }
    ];
    const items2 = [
      {
        key: '0',
        label: (<Link to="/" style={linkStyle} ><HomeOutlined /> E Bookstore</Link>)
      },
      {
        key: '1',
        label: (<Link to="/login" style={linkStyle} ><UserOutlined /> 登出</Link>)
      },
      {
        key: '2',
        label: (<Link to="/" style={linkStyle} ><DollarCircleOutlined /> 购物车</Link>)
      },
      {
        key: '3',
        label: (<Link to="/" style={linkStyle} ><WalletOutlined /> 我的订单</Link>)
      },
    ];

    return(
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <div
          style={{
            float: 'left',
            width: 120,
            height: 32,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={items2}
        />
      </Header>
    );
  }
}

export default Toolbar;