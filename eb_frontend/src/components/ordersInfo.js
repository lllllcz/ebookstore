import React from "react";
import priceFormat from "../utils/priceFormat";
import * as orderService from "../services/orderService";
import {Descriptions, List} from "antd";

class OrdersInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders:[],
    }
  }

  componentDidMount() {
    // eslint-disable-next-line
    const user = eval('(' + localStorage.getItem("user") + ')');
    const callback = (data) => {
      // console.log(data);
      if (data.state >= 0) {
        // eslint-disable-next-line
        const jsonData = eval('(' + data.data + ')');
        console.log(jsonData);
        this.setState({
          orders : jsonData,
        });
      }
    }
    orderService.getUserOrders(user.userId, callback);
  }

  render() {
    return (
      <List
        size="large"
        header={<div style={{textAlign:"center"}}>我的订单</div>}
        footer={<div style={{textAlign:"right"}}>共 {this.state.orders.length} 项</div>}
        bordered
        dataSource={this.state.orders}
        renderItem={(item) =>
          <List.Item>
            <Descriptions title="Order Info" size="small" column={2} bordered >
              <Descriptions.Item label="date" >{item.orderDate}</Descriptions.Item>
              <Descriptions.Item label="price">￥ {priceFormat(item.orderPrice)}</Descriptions.Item>
              <Descriptions.Item label="books" span={2} >
                <List
                  dataSource={item.orderItems}
                  renderItem={(book) =>
                    <Descriptions >
                      <Descriptions.Item label="book-name">{book.book.bookName}</Descriptions.Item>
                      <Descriptions.Item label="book-num">{book.bookNum}</Descriptions.Item>
                    </Descriptions>
                  }
                />
              </Descriptions.Item>
            </Descriptions>
          </List.Item>
        }
      />
    );
  }

}

export default OrdersInfo;