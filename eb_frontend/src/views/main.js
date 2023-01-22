import {Breadcrumb, Layout} from 'antd';
import Toolbar from "../components/toolbar";
import Bookshelf from "../components/bookshelf";
import {HomeOutlined} from "@ant-design/icons";

const { Content, Footer } = Layout;

function MainView() {

  return (
    <Layout>
      <Toolbar />

      <Content style={{padding: '0 150px',}}>
        <Breadcrumb style={{margin: '16px 0',}}>
          <Breadcrumb.Item><HomeOutlined /> Home</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            backgroundColor: 'white',
          }}
        >
          <Bookshelf />
        </div>
      </Content>

      <Footer style={{textAlign: 'center',}}>
        E Bookstore ©2023 Created by lllllcz
      </Footer>
    </Layout>
  );
}
export default MainView;