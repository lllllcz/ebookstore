import Toolbar from "../components/toolbar";
import {Content, Footer} from "antd/es/layout/layout";
import {Breadcrumb, Layout} from "antd";
import {HomeOutlined, WalletOutlined} from "@ant-design/icons";
import OrdersInfo from "../components/ordersInfo";

function OrdersView() {

  return(
    <Layout>
      <Toolbar />

      <Content className="l-content" >
        <Breadcrumb className="l-breadcrumb" >
          <Breadcrumb.Item><HomeOutlined /> Home</Breadcrumb.Item>
          <Breadcrumb.Item><WalletOutlined /> Orders</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <OrdersInfo />
        </div>
      </Content>

      <Footer style={{textAlign: 'center',}}>
        E Bookstore ©2023 Created by lllllcz
      </Footer>
    </Layout>
  );
}
export default OrdersView;