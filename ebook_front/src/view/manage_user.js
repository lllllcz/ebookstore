import WebTop from "../components/web_top";
import {withRouter} from "react-router-dom";
import React from "react";
import {Button } from "antd";

import * as managerService from "../services/managerService"

class UserEdit extends React.Component {
  constructor() {
    super();
  }

  handleDisableUser = () => {
    const callback = (data) => {
      console.log(data);
    }
    managerService.disableUser(this.props.user.userId, callback);
    window.location.reload();
  }

  handleEnableUser = () => {
    const callback = (data) => {
      console.log(data);
    }
    managerService.enableUser(this.props.user.userId, callback);
    window.location.reload();
  }

  render() {
    const user = this.props.user;
    let element = [];
    if (user.userType === 0) {
      element.push(<p className="left-column">普通</p>);
      element.push(
        <div className="left-column">
          <Button onClick={this.handleDisableUser}>禁用</Button>
        </div>
      );
    }
    else if (user.userType === 1) {
      element = (<p className="left-column">管理员</p>)
    }
    else {
      element.push(<p className="left-column">普通（被禁用）</p>);
      element.push(
        <div className="left-column">
          <Button onClick={this.handleEnableUser}>启用</Button>
        </div>
      );
    }

    return(
      <div className="manage-container">
        <p>用户</p>
        <p className="left-column">{user.userId}</p>
        <p className="left-column">{user.userName}</p>
        {element}
        <div className="clearfix"> </div>
      </div>
    );
  }

}

class ManageUser extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    const callback = (data) => {
      this.setState({users: data});
      console.log(data);
    }
    managerService.getAllUsers( callback);
  }


  render() {
    let elements = [];
    elements.push(
      <div className="manage-container">
        <p className="left-column">用户ID</p>
        <p className="left-column">用户名</p>
        <p className="left-column">用户类型</p>
        <div className="clearfix"> </div>
      </div>
    )
    this.state.users.forEach((user) => {
      elements.push(
        <UserEdit user={user} />
      )
    })

    return(
      <div className="Container">
        {elements}
      </div>
    );
  }

}


class MUPage extends React.Component {
  render() {
    return (
      <div className="MUPage">
        <WebTop user={this.props.userName} userType={this.props.userType} />
        <ManageUser />
      </div>
    )
  }
}

export default withRouter(MUPage);