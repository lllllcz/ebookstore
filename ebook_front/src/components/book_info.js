import React from "react";
import '../css/book_info.css'
import {Link} from "react-router-dom";
import {addBookToCart} from "../services/bookService";
import NumFormat from "../utils/numFormat";

class LeftZone extends React.Component {
  render() {
    return (
      <div className="LeftZone">
        <Link to="/">
          <p>主页</p>
        </Link>
        <Link to="/cart">
          <p>我的购物车</p>
        </Link>
      </div>
    );
  }
}


class DetailSpan extends React.Component {
  render() {
    return (
      <div className="DetailSpan">
        <p className="left">{this.props.left}</p>
        <p className="right">{this.props.right}</p>
        <div className="clearfix"> </div>
      </div>
    );
  }
}



class InfoZone extends React.Component {

  addCart = () => {
    const data={userId: this.props.userId, bookId: this.props.book.bookId};
    const callback = (data) => {
      // if (data.status >= 0) {
      //     window.alert("成功");
      // }
      // else {
      //     window.alert("失败");
      // }
      console.log(data);
    }
    addBookToCart(data, callback);
  }

  render() {
    const reqJPGs = require.context('../assets/', true, /\.jpg$/);
    const JPGPaths = reqJPGs.keys();
    const index = (this.props.book.bookId <= 4) ? (this.props.book.bookId - 1) : 0;
    const imagePath = JPGPaths[index];
    const image = reqJPGs(imagePath);
    const element = (<img src={image} alt=""/>);

    const price = NumFormat(this.props.book.bookPrice);

    return (
      <div className="InfoZone">
        <div className="pict">
          {element}
        </div>
        <div className="brief">
          <div className="book-name">
            <h3>{this.props.book.bookName}</h3>
            <br/>
            <h3 style={{color:"red"}}>￥{price}</h3>
            <div className="clearfix"> </div>
            <p>
              {this.props.book.bookDescription}
            </p>
          </div>
          <DetailSpan left="作者" right={this.props.book.author}/>
          <DetailSpan left="ISBN" right={this.props.book.isbn}/>
          <DetailSpan left="库存" right={this.props.book.inventory}/>
          <button className="purchase">现在购买！</button>
          <button className="purchase" onClick={this.addCart}>加入购物车</button>
        </div>
        <div className="clearfix"> </div>
        <div className="DetailInfo">
          <ul className="nav-tabs">
            <li><p>更多信息</p></li>
          </ul>
          <div>
            <p className="tab-text">{this.props.book.bookDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

class BookInfo extends React.Component {
  render() {
    return (
      <div className="BookInfo">
        <div className="Container">
          <div className="Product">
            <LeftZone/>
            <InfoZone userId={this.props.userId} book={this.props.book}/>
          </div>
        </div>
      </div>
    );
  }
}

export default BookInfo;