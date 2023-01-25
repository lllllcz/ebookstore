import Toolbar from "../components/toolbar";
import {Breadcrumb, Layout} from "antd";
import {DollarCircleOutlined, HomeOutlined} from "@ant-design/icons";
import {Content, Footer} from "antd/es/layout/layout";
import CartInfo from "../components/cartInfo";

function CartView() {
  return(
    <Layout>
      <Toolbar />

      <Content className="l-content" >
        <Breadcrumb className="l-breadcrumb" >
          <Breadcrumb.Item><HomeOutlined /> Home</Breadcrumb.Item>
          <Breadcrumb.Item><DollarCircleOutlined /> Cart</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <CartInfo />
        </div>
      </Content>

      <Footer style={{textAlign: 'center',}}>
        E Bookstore ©2023 Created by lllllcz
      </Footer>
    </Layout>
  );
}
export default CartView;
