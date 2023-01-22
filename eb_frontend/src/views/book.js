import {useSearchParams} from "react-router-dom";
import * as bookService from "../services/bookService";
import Toolbar from "../components/toolbar";
import {Layout} from "antd";
import BookDetail from "../components/bookDetail";

const { Footer } = Layout;

const BookView = () => {
  const [params] = useSearchParams()
  let id = params.get('id')
  return(
    <Layout>
      <Toolbar />
      <BookDetail id={id} />
      <Footer style={{textAlign: 'center',}}>
        E Bookstore ©2023 Created by lllllcz
      </Footer>
    </Layout>
  );
}
export default BookView;