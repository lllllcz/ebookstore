import React from "react";
import {Link, withRouter} from "react-router-dom";
import '../css/login.css'

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import * as userService from "../services/userService";

// function checkEmpty(e) {
//     const username = document.getElementById("nam").value;
//     const password = document.getElementById("pas").value;
//     if (username === "" || password === "") {
//         window.alert("empty");
//         e.preventDefault();
//     }
//     else {
//         return true;
//     }
// }

class LoginForm extends React.Component {


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                userService.login(values);
                // window.location.reload();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            style={{border: "1px solid #d9d9d9", borderRadius: "4px"}}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a href="">
                        Forgot password
                    </a>

                    <br />

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn"
                    >
                        Log in
                    </Button>

                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

class Login extends React.Component {
    render() {
        return(
            <div className="Login">
                <h1>Login to view!</h1>
                <div className="container">

                    <h2>Login</h2>

                    {/*<form action="#" method="post" onSubmit={checkEmpty}>*/}
                    {/*    <div className="input-group">*/}
                    {/*        <label>*/}
                    {/*            <input type="email" placeholder="Username or Email" required="" id="nam" />*/}
                    {/*        </label>*/}
                    {/*    </div>*/}
                    {/*    <div className="input-group">*/}
                    {/*        <label>*/}
                    {/*            <input type="Password" placeholder="Password" required="" id="pas" />*/}
                    {/*        </label>*/}
                    {/*    </div>*/}
                    {/*    <div className="form-row-bottom">*/}
                    {/*        <a href="#forget" className="forgot">Forgot password?</a>*/}
                    {/*    </div>*/}
                    {/*    <button className="btn" type="submit">Login</button>*/}
                    {/*</form>*/}

                    <WrappedLoginForm />

                    <p className="account">
                        Don't have an account?
                        <br />
                        <Link to="/signup">Sign up</Link>
                    </p>

                </div>
            </div>
        );
    }
}

export default withRouter(Login);