import {Breadcrumb, Button, Carousel, Divider, Image, Layout, message} from 'antd';
import Toolbar from "../components/toolbar";
import Bookshelf from "../components/bookshelf";
import {HomeOutlined} from "@ant-design/icons";
import {fallbackImage} from "../assets/fallbackImage";
import {openSocket} from "../utils/websocket";
import {hello} from "../services/userService";

const { Content, Footer } = Layout;

function MainView() {

  const userStr = localStorage.getItem("user");
  let userId = "00";
  if (userStr != null) {
    // eslint-disable-next-line
    const user = eval('(' + userStr + ')');
    userId = user.userId;
  }
  openSocket(userId);

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
          <Button
            style={{
              margin:50,
            }}
            onClick={() => {
              hello(userId, (data)=>{console.log(data)})
            }}
          >
            联系客服
          </Button>
        </div>
      </Content>

      <Footer style={{textAlign: 'center',}}>
        E Bookstore ©2023 Created by lllllcz
      </Footer>
    </Layout>
  );
}
export default MainView;