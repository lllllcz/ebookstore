import * as userService from "../services/userService"
import "../css/login.css"
import {useNavigate} from "react-router";
import {Button, Form, Input, message} from "antd";
import {UserAddOutlined} from "@ant-design/icons";

function SignupView() {

  const navigate = useNavigate();
  const onFinish = value => {
    console.log(value);
    const callback = (data) => {
      console.log(data);
      if(data.state >= 0) {
        message.success(data.msg);
        navigate("/login");
        window.location.reload();
      }
      else{
        message.error(data.msg);
      }
    }
    userService.signup(value, callback);
  }

  return (
    <div className="Login">
      <h1>Hello, New Friend!</h1>
      <div className="form-container">

        <h2><UserAddOutlined /> Sign Up</h2>

        <Form
          name="basic"
          labelCol={{span: 8,}}
          wrapperCol={{span: 16,}}
          style={{maxWidth: 600,}}
          initialValues={{remember: true,}}
          onFinish={onFinish}
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
            hasFeedback
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

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

      </div>
    </div>
  );

}

export default SignupView;