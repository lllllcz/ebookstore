import {Breadcrumb, Carousel, Divider, Image, Layout} from 'antd';
import Toolbar from "../components/toolbar";
import Bookshelf from "../components/bookshelf";
import {HomeOutlined} from "@ant-design/icons";
import {fallbackImage} from "../assets/fallbackImage";

const { Content, Footer } = Layout;

function MainView() {

  return (
    <Layout>
      <Toolbar />

      <Content className="l-content" >
        <Breadcrumb className="l-breadcrumb" >
          <Breadcrumb.Item><HomeOutlined /> Home</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{padding:36}} >
          <Carousel autoplay>
            {/*<Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" fallback={fallbackImage} />*/}
          </Carousel>
          <Divider />
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