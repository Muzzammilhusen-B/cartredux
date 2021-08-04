import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Form, Button, Input } from "antd";

class Forgotpwd extends React.Component {
  render() {
    return (
      <div className="login-form">
        <h1>Forgot Password</h1>
        <Form name="forgot password" initialValues={{ remember: true }}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Form>
        <Button type="primary">Get OTP</Button>

        <div style={{ marginTop: "10px" }}>
          <Link to="/">Log in</Link>
        </div>
      </div>
    );
  }
}

export default Forgotpwd;
