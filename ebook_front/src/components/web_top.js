import React from "react";
import '../css/web_top.css'
import {Link} from 'react-router-dom';

import cart from "../assets/bag.png"
import * as userService from "../services/userService";

class RightHeaderItem extends React.Component {
  render() {
    const element = (
      <Link to={this.props.url}>
        {this.props.img ? <img src={cart} alt="?"/> : <p></p>}
        <p>{this.props.text}</p>
        <div className="clearfix"> </div>
      </Link>
    );

    return (
      <div className="RightHeaderItem">
        {element}
      </div>
    );
  }
}

class RightHeader extends React.Component {
  render() {
    return (
      <div className="RightHeader">
        <RightHeaderItem url="/cart" img={true} text="购物车"/>
        <RightHeaderItem url="/orders" img={false} text="我的订单"/>
        <RightHeaderItem url="/statistic" img={false} text="统计"/>
      </div>
    );
  }
}

class MyHeader extends React.Component {

  handleLogout = e => {
    e.preventDefault();
    userService.logout();
    window.location.reload();
  }

  render() {

    // const log = (!this.props.isAuthed) ? (
    //     <a onClick={this.handleLogout}>登出</a>
    // ) : (
    //     <Link to="/login">登录</Link>
    // )
    const log = (<a onClick={this.handleLogout}>登出</a>);


    return (
      <div className="MyHeader">
        <div className="Container">
          <div className="LeftHeader">
            <ul>
              <li> {log} </li>
              <li><a style={{marginLeft:"100px", color:"black", fontWeight:1000, fontSize: "20px"}} >
                你好，{this.props.user}
              </a></li>
            </ul>
          </div>
          <RightHeader/>
          <div className="clearfix"> </div>
        </div>
      </div>
    );
  }
}

class Banner extends React.Component {
  render() {
    let elements;
    if (this.props.userType === 1) {
      elements = (
        <ul>
          <li><Link to="/">主页</Link></li>
          <li><Link to="/manage/users">用户管理</Link></li>
          <li><Link to="/manage/books">书籍管理</Link></li>
          <li><Link to="/orders">订单管理</Link></li>
        </ul>
      )
    }
    else {
      elements = (
        <ul><li><Link to="/">主页</Link></li></ul>
      )
    }

    return (
      <div className="Banner">
        <div className="Container">
          <nav className="navbar">
            <div className="navbar-title">
              <h1>
                <Link to="/">
                  <span>E</span>
                  <p>- Bookstore</p>
                </Link>
              </h1>
            </div>
            <div className="navbar-options">
              {elements}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

class WebTop extends React.Component {
  render() {
    return (
      <div>
        <MyHeader user={this.props.user} />
        <Banner userType={this.props.userType} />
      </div>
    );
  }
}

export default WebTop;