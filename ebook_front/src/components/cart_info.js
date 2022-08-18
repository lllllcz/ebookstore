import React from "react";
import '../css/cart.css'
import {Link} from "react-router-dom";
import * as bookService from "../services/bookService";
import NumFormat from "../utils/numFormat";

class CartBanner extends React.Component {
  render() {
    return (
      <div className="CartBanner">
        <ul className="leftCB">
          <li className="homeE">
            <Link to="/" title="Go to Home Page">Home</Link>
            <span> > </span>
          </li>
          <li className="cartE">
            {this.props.text}
          </li>
        </ul>
        <ul className="previous">
          <li><Link to="/">Back to Previous Page</Link></li>
        </ul>
        <div className="clearfix"> </div>
      </div>
    );
  }
}

export {CartBanner};


class ItemInCart extends React.Component {
  constructor() {
    super();
    this.state = {
      book: {},
    }
  }

  componentDidMount() {
    const callback = (data) => {
      this.setState({book: data});
      console.log(data);
    }
    bookService.getBook(this.props.book.bookId, callback);
  }

  handleDelete = () => {
    const data = {
      userId: this.props.userId,
      bookId: this.props.book.bookId,
    }
    const callback = (data) => {
      console.log(data);
    }
    bookService.removeCartBook(data, callback);

    window.location.reload();
  }

  render() {
    const book = this.state.book;

    const reqJPGs = require.context('../assets/', true, /\.jpg$/);
    const JPGPaths = reqJPGs.keys();
    const index = (this.props.book.bookId <= 4) ? (this.props.book.bookId - 1) : 0;
    const imagePath = JPGPaths[index];
    const image = reqJPGs(imagePath);
    const element = (<img src={image} alt=""/>);

    const price = NumFormat(book.bookPrice);

    return (
      <div className="ItemInCart">
        <div className="cart-pic">
          {element}
        </div>
        <div className="cart-item-info">
          <h3>
            <Link to={{pathname: '/detail', search: '?id='+this.props.book.bookId}} >
              {book.bookName}
            </Link>
          </h3>
          <ul className="qty">
            <li><p>数量：{this.props.book.bookNum}</p></li>
          </ul>
          <div className="delivery">
            <p>价格 : ￥{price}</p>
            <div className="clearfix"> </div>
          </div>
        </div>
        <button onClick={this.handleDelete}>从购物车移除。不行，后端还没实现</button>
        <div className="clearfix"> </div>
      </div>
    );
  }
}

class CartInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cartBooks: {},
      orderItems: [],
      price: 0.0,
    }
  }

  componentDidMount() {
    const callback = (data) => {
      this.setState(
        {
          cartBooks: data,
          orderItems: data.orderItems,
          price: data.orderPrice,
        }
      )
      console.log(data);
    }

    bookService.getCartBooks(this.props.userId, callback);

  }

  handleOrder = () => {
    const callback = (data) => {

      console.log(data);
    }

    const data = {
      userId: this.props.userId,
      price: this.state.price
    }
    bookService.addOrder(data, callback);
    window.location.reload();
  }


  render() {
    let element = [];
    if (this.state.orderItems.length === 0) {
      element = <p>empty</p>
    }
    else {
      this.state.orderItems.forEach((item) => {
        element.push(
          <ItemInCart userId={this.props.userId} book={item} />
        )
      })
    }

    const totalPrice = NumFormat(this.state.price);

    return (
      <div className="CartInfo">
        <div className="Container">
          <CartBanner text="Cart"/>
          <h2> 我的购物车 </h2>
          <div className="CartBooks">
            <div className="CartBorder">
              {element}
              <p>共计：￥ {totalPrice}</p>
              <button className="BuyCart" onClick={this.handleOrder} >
                现在下单
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartInfo;