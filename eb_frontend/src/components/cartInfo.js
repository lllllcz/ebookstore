import React from "react";
import {Avatar, Button, List, message} from "antd";
import * as orderService from '../services/orderService'
import {Link} from "react-router-dom";
import priceFormat from "../utils/priceFormat";

class CartInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  }

  componentDidMount() {
    // eslint-disable-next-line
    const user = eval('(' + localStorage.getItem("user") + ')');
    const callback = (data) => {
      console.log(data)
      this.setState({
        books : data.data,
      })
    }
    orderService.getUserCart(user.userId, callback);
  }

  setOrder = () => {
    // eslint-disable-next-line
    const user = eval('(' + localStorage.getItem("user") + ')');
    const callback = (data) => {
      console.log(data);
      // message.success(data.msg);
      window.location.reload();
    }
    orderService.setOrder(user.userId, callback);
  }

  render() {

    let cartItems = [];
    const books = this.state.books;
    let i = 0;
    while (i < books.length) {
      const item = {
        bookId : books.at(i).bookId,
        bookNum : books.at(i).bookNum,
        price : books.at(i).book.bookPrice,
        name : books.at(i).book.bookName,
        avatar : 'https://joeschmoe.io/api/v1/random',
      }
      cartItems.push(item);
      i+=1;
    }

    return(
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={cartItems}
        footer={
          <div>
            购物车中共计：<b>{books.length}</b> 项
            <br/><br/>
            <Button onClick={this.setOrder}>下单</Button>
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<Link to={"/book?bookId="+item.bookId}>{item.name}</Link>}
              description={"￥ "+priceFormat(item.price)}
            />
            数量：{item.bookNum}
            <br/><br/>
            <Button
              onClick={() => {
                // eslint-disable-next-line
                const user = eval('(' + localStorage.getItem("user") + ')');
                const callback = (data) => {
                  console.log(data);
                  message.success(data.msg);
                  window.location.reload();
                }
                orderService.removeBookFromCart(user.userId, item.bookId, callback);
              }}
            >
              移除一本
            </Button>
          </List.Item>
        )}
      />
    );
  }
}
export default CartInfo;