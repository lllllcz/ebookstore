import {Layout} from "antd";
import Toolbar from "../components/toolbar";
import {Footer} from "antd/es/layout/layout";

function NotFound() {
  return(
    <Layout>
      <Toolbar />
      <h1 style={{textAlign:"center", margin:200,}}>Page Not Found</h1>
      <Footer style={{textAlign: 'center',}}>
        E Bookstore ©2023 Created by lllllcz
      </Footer>
    </Layout>
  );
}
export default NotFound;