import React from "react";
import {CartBanner} from './cart_info'
import '../css/order.css'
import {getBook, getOrders} from "../services/bookService";
import {getAllOrders} from "../services/managerService";
import SearchBar from "./search_bar";
import {Button, DatePicker} from "antd";

class BookOfOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      book: {},
    }
  }

  componentDidMount() {
    const callback = (data) => {
      console.log(data);
      this.setState({book: data});
    }
    getBook(this.props.bookId, callback);
  }

  render() {
    return(
      <li>
        {this.state.book.bookName} ( * {this.props.num})
      </li>
    );
  }

}


class OrderInList extends React.Component {

  constructor() {
    super();
    this.state = {
      books: [],
    }
  }

  componentDidMount() {

  }

  render() {
    const oneOrder = this.props.order;
    const books = this.props.order.orderItems;
    const ele = [];
    // console.log(this.state.books);
    books.forEach((item) => {
      ele.push(
        <BookOfOrder bookId={item.bookId} num={item.bookNum} />
      )
    })

    return (
      <tr>
        <td>{oneOrder.userId}</td>
        <td>{oneOrder.orderId}</td>
        <td>{oneOrder.orderDate}</td>
        <td>￥{oneOrder.orderPrice}</td>
        <td style={{textAlign: "center"}}>
          <ul>
            {ele}
          </ul>
        </td>
      </tr>
    );
  }
}

class OrderInfo extends React.Component {

  constructor() {
    super();
    this.state = {
      orders: [],
      filterText: '',
      startDate: '',
      endDate: '',
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  componentDidMount() {
    const callback = (data) => {
      this.setState(
        {orders: data}
      );
      console.log(data);
    }
    if (this.props.userType !== 1) {
      getOrders(this.props.userId, callback);
    }
    else {
      getAllOrders(callback);
    }
  }

  handleFilterTextChange(filterText) {
    this.setState({filterText: filterText});
  }

  handleStartDateChange = (date, dateString) => {
    // console.log(dateString);
    this.setState({startDate: dateString});
  }
  handleEndDateChange = (date, dateString) => {
    // console.log(dateString);
    this.setState({endDate: dateString});
  }

  render() {
    const element = [];
    let orders = [];
    if (this.state.filterText !== '' ||
      (this.state.startDate !== '' && this.state.endDate !== ''))
    {
      // 进行搜索
      this.state.orders.forEach((order) => {
        // if (order.orderDate.indexOf(this.state.filterText) === -1) {
        //   return;
        // }
        const date = new Date(order.orderDate.substring(0, 10));
        const start = new Date(this.state.startDate);
        const end = new Date(this.state.endDate);
        if (date < start || date > end) {return;}
        orders.push(order);
      });
    } else {
      // 未进行搜索
      orders = this.state.orders;
    }
    orders.forEach((userOrder) => {
      element.push(
        <OrderInList order={userOrder}/>
      )
    });

    return (
      <div className="CartInfo">
        <div className="Container">
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
        </div>
        <div className="Container">
          <CartBanner text="Order"/>
          <h2 style={{fontFamily: "仿宋, serif"}}> 订单 </h2>
          <div className="search-sales">
            <DatePicker onChange={this.handleStartDateChange} placeholder='起始日期' />
            <DatePicker onChange={this.handleEndDateChange} placeholder='终止日期' />
          </div>
          <div className="OrderInList">
            <table border="1" style={{fontFamily: "黑体, serif"}}>
              <tr>
                <th>用户</th>
                <th>订单号</th>
                <th>时间</th>
                <th>价格</th>
                <th>订单详情</th>
              </tr>
              {element}
            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default OrderInfo;