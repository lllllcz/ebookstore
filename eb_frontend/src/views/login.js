import {Button, Divider, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
import {QuestionCircleTwoTone, UserOutlined} from "@ant-design/icons";

import * as userService from "../services/userService"

import "../css/login.css"
import {useNavigate} from "react-router";

function LoginView() {

  const navigate = useNavigate();
  const onFinish = value => {
    console.log(value);
    const callback = (data) => {
      console.log(data);
      if(data.status >= 0) {
        message.success(data.msg);
        localStorage.setItem('user', JSON.stringify(data.data));
        navigate("/");
        window.location.reload();
      }
      else{
        message.error(data.msg);
      }
    }
    userService.login(value, callback);
  }

  return (
    <div className="Login">
      <h1>Welcome!</h1>
      <div className="container">

        <h2><UserOutlined /> Login</h2>

        <Form
          name="basic"
          labelCol={{span: 8,}}
          wrapperCol={{span: 16,}}
          style={{maxWidth: 600,}}
          initialValues={{remember: true,}}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password/>
          </Form.Item>

          {/*<Form.Item*/}
          {/*  name="remember"*/}
          {/*  valuePropName="checked"*/}
          {/*  wrapperCol={{*/}
          {/*    offset: 8,*/}
          {/*    span: 16,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Checkbox>Remember me</Checkbox>*/}
          {/*</Form.Item>*/}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <div style={{textAlign:'right'}}>
          <p style={{color:'rgba(0,0,0,0.6)', fontSize:13,}} ><QuestionCircleTwoTone /> Don't have an account?</p>
          <Button><Link to="/signup">Sign up</Link></Button>
        </div>

      </div>
    </div>
  );

}

export default LoginView;