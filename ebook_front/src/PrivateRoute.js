import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "./services/userService"
import {message} from "antd";

export default class PrivateRoute extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isAuthed: false,
      hasAuthed: false,
      userId: 0,
      userName: "username",
      userType: 1,
    };
  }

  checkAuth = (data) => {
    console.log(data);
    if (data.status >= 0) {
      this.setState({
        isAuthed: true,
        hasAuthed: true,
        userId: data.data.userId,
        userName: data.data.username,
        userType: data.data.userType,
      });
    } else {
      message.error(data.msg);
      localStorage.removeItem('user');
      this.setState({isAuthed: false, hasAuthed: true});
    }
  };


  componentDidMount() {
    if (this.props.debug) {
      this.setState({
        isAuthed: true,
        hasAuthed: true,
      })
    }
    else {
      userService.checkSession(this.checkAuth);
    }
  }


  render() {

    const {component: Component, path="/",exact=false,strict=false} = this.props;

    console.log(this.state.isAuthed);

    if (!this.state.hasAuthed) {
      return null;
    }

    return <Route path={path} exact={exact} strict={strict} render={props => (
      this.state.isAuthed ? (
        <Component
          userType={this.state.userType}
          userId={this.state.userId}
          userName={this.state.userName}
          {...props}
        />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
        }}/>
      )
    )}/>
  }
}

