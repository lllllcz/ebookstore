import {Button, Menu, message} from "antd";
import {Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import {DollarCircleOutlined, HomeOutlined, UserAddOutlined, UserOutlined, WalletOutlined} from "@ant-design/icons";

import * as userService from "../services/userService"
import {useNavigate} from "react-router";

const linkStyle = {
  color:'white',
  margin:'0 15px',
}

function Toolbar() {

  const navigate = useNavigate();
  const handleLogout = () => {
    const callback = (data) => {
      if(data.state < 0) {
        message.success(data.msg);
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
      }
      else{
        message.error("no reply");
      }
    };
    userService.logout(callback);
  }

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
      label: (<Link to="/signup" style={linkStyle} ><UserAddOutlined /> 注册</Link>)
    }
  ];
  const items2 = [
    {
      key: '0',
      label: (<Link to="/" style={linkStyle} ><HomeOutlined /> E Bookstore</Link>)
    },
    {
      key: '1',
      label: (<Button type="text" style={linkStyle} onClick={handleLogout} ><UserOutlined /> 登出</Button>)
    },
    {
      key: '2',
      label: (<Link to="/cart" style={linkStyle} ><DollarCircleOutlined /> 购物车</Link>)
    },
    {
      key: '3',
      label: (<Link to="/orders" style={linkStyle} ><WalletOutlined /> 我的订单</Link>)
    },
  ];
  const auth = eval('(' + localStorage.getItem("user") + ')');
  const items = (auth == null) ? (items1) : (items2);

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
        items={items}
      />
    </Header>
  );
}

export default Toolbar;