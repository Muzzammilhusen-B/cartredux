import React, { Component } from "react";
import "./login.css";
import { Link, withRouter } from "react-router-dom";
import { saveToLocalStorage } from "../localStorage";
import { Button, Input, Form, message, Space, Layout } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";

const { Content } = Layout;
class Login extends Component {
  state = {
    username: "",
    password: "",
    remember: false,
    errors: {
      username: "",
      password: "",
    },
  };
  // component life cycle after mount
  componentDidMount() {
    this.informtionData = JSON.parse(localStorage.getItem("logindata"));
    // console.log(this.informtionData);
    if (this.informtionData) {
      this.setState({
        username: this.informtionData.username,
        password: this.informtionData.password,
        remember: this.informtionData.remember,
      });
    } else {
      this.setState({
        username: "",
        password: "",
        remember: "",
      });
    }
  }

  //on change event handler
  handleChange = (event) => {
    // event.preventDefault();
    // console.log(event.target.value);
    const { name, value } = event.target;
    const checkbox = event.target.checked;
    // console.log(checkbox);

    const isChecked = checkbox ? true : "";
    let errors = this.state.errors;
    switch (name) {
      case "username":
        errors.username = !value.match(
          /^(?=[a-zA-Z]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        )
          ? "Username must be at least 5 characters long and without special character!"
          : "";
        break;
      case "password":
        errors.password = !value.match(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,1000}$"
        )
          ? "*Password should contain one smallcase, uppercase, symbol & number each and minimum 6 in length"
          : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value, remember: isChecked });
  };

  //withRouter history for redirect the page
  redirectLoginHome = () => {
    // localStorage.setItem("cartState", JSON.stringify(product));
    const { history } = this.props;
    if (history) history.push("/loginhome");
  };

  //form(fields) validation
  handleValidation = () => {
    let formIsValid = true;
    if (
      this.state.errors.password === "" &&
      this.state.errors.username === ""
    ) {
      return formIsValid;
    } else {
      return false;
    }
  };

  //form submit handler
  handleSubmit = (e) => {
    e.preventDefault();
    const { remember } = this.state;
    // console.log(remember);
    // console.log(this.state);

    if (remember && this.handleValidation(this.state.errors)) {
      const success = () => {
        message.success("You are Logged in.");
      };
      // console.log("Form submitted with stored data", this.state);
      success();
      this.redirectLoginHome();
      localStorage.setItem("logindata", JSON.stringify(this.state));
      saveToLocalStorage();
    } else if (this.handleValidation(this.state.errors)) {
      const success = () => {
        message.success("You are Logged in.");
      };
      // console.log("Form submitted without stored data", this.state);
      success();
      this.redirectLoginHome();
      saveToLocalStorage();
    } else if (!this.handleValidation()) {
      console.error("Form has error");
    }
  };

  render() {
    const { errors, username, password } = this.state;
    return (
      <div>
        <Layout>
          <Content className="login-form">
            <h1 style={{ color: "blue" }}>Login Form</h1>
            <Form>
              <label>
                Username :{""}
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="Username"
                  // style={{ marginTop: "10px", marginLeft: "8px" }}
                  required
                />
              </label>
              <br />
              <span style={{ color: "red" }}>{errors["username"]}</span>
              <br />
              <label>
                Password : {""}
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  width={"100%"}
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                  // style={{ marginTop: "10px", marginLeft: "8px" }}
                  required
                />
              </label>
              <br />
              <span style={{ color: "red" }}>{errors["password"]}</span>
              <br />
              <label>
                <input
                  type="checkbox"
                  width={"100%"}
                  id="remember"
                  name="remember"
                  defaultChecked={this.state.remember}
                  onChange={this.handleChange}
                  // style={{ marginTop: "10px" }}
                />
                {""} Remember Me
              </label>
              <Link className="login-form-forgot" to="/forgotpwd">
                Forgot passwod
              </Link>
              <Button
                disabled={username && password !== "" ? "" : true}
                className="login-form-button"
                type="primary"
                onClick={this.handleSubmit}
                icon={<LoginOutlined />}
              >
                Log in
              </Button>
              <Space>
                New user? <Link to="/registration">Register Now</Link>
              </Space>
            </Form>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default withRouter(Login);
