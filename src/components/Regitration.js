import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

class Registration extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    remember: false,
    errors: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    },
  };

  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("registrationData"));
    if (this.userData) {
      this.setState({
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        email: this.userData.email,
        username: this.userData.username,
        password: this.userData.password,
        remember: this.userData.remember,
      });
    }
  }

  //On change event

  handleOnchange = (event) => {
    // event.preventDefault();

    const { name, value } = event.target;
    const checkbox = event.target.checked;
    // console.log(checkbox);
    const isChecked = checkbox ? true : false;
    let errors = this.state.errors;

    switch (name) {
      case "firstname":
        errors.firstname = !value.match(
          /^(?=[a-zA-Z]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        )
          ? "*Firstname must be at least 5 characters long and without special character!"
          : "";
        break;
      case "lastname":
        errors.lastname = !value.match(
          /^(?=[a-zA-Z]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        )
          ? "*Lastname must be at least 3 characters long and without special character!"
          : "";
        break;
      case "email":
        let lastAtPos = value.lastIndexOf("@");
        let lastDotPos = value.lastIndexOf(".");
        errors.email = !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          value.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          value.length - lastDotPos > 2
        )
          ? "*Email is not valid"
          : "";
        break;
      case "password":
        errors.password = !value.match(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$"
        )
          ? "*Password should contain one smallcase, uppercase, symbol & number each and between 6-10 length"
          : "";
        break;
      case "confirm_password":
        let pass1 = this.state.password;
        errors.confirm_password =
          value !== pass1 ? "*Password do not match." : "";
        break;
      case "username":
        errors.username = !value.match(
          /^(?=[a-zA-Z]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        )
          ? "*Username must be at least 5 characters long and without special character!"
          : "";
        break;
      default:
        break;
    }

    this.setState({ errors, remember: isChecked, [name]: value });
  };
  // withRouter for redirect page
  redirectToRegistered = () => {
    const { history } = this.props;
    if (history) history.push("/registered");
  };

  //form validation handle
  handleValidation = () => {
    let formIsValid = true;

    return formIsValid;
  };

  //form submit handler
  handleRegister = (e) => {
    e.preventDefault();
    const { remember } = this.state;
    // console.log(remember);
    // console.log(this.state);
    if (remember && this.handleValidation(this.state.errors)) {
      console.log("Form submitted with stored data");
      this.redirectToRegistered();
      localStorage.setItem("registrationData", JSON.stringify(this.state));
    } else if (!this.handleValidation(this.state.errors)) {
      console.error("Form has error");
    }
  };

  render() {
    const {
      firstname,
      lastname,
      username,
      password,
      email,
      remember,
      confirm_password,
    } = this.state;

    return (
      <div className="login-form">
        <span>
          <h1>User Registration</h1>
          <h5 style={{ color: "red" }}>* Fields are mandatory</h5>
        </span>
        <form onSubmit={this.handleRegister}>
          <div style={{ marginTop: "8px" }}>
            <label>
              First name*:
              <input
                type="text"
                name="firstname"
                defaultValue={firstname}
                id="firstname"
                placeholder="Enter first name"
                onChange={this.handleOnchange}
                required
              />
            </label>
          </div>
          <br />
          <span style={{ color: "red" }}>{this.state.errors["firstname"]}</span>
          <br />
          <div style={{ marginTop: "8px" }}>
            <label>
              Last name*:
              <input
                type="text"
                name="lastname"
                defaultValue={lastname}
                id="lastname"
                placeholder="Enter last name"
                onChange={this.handleOnchange}
                required
              />
            </label>
          </div>
          <br />
          <span style={{ color: "red" }}>{this.state.errors["lastname"]}</span>
          <br />
          <div>
            <label>
              Username*:
              <input
                type="text"
                name="username"
                defaultalue={username}
                id="username"
                placeholder="Enter user name"
                onChange={this.handleOnchange}
                required
              />
            </label>
          </div>
          <br />
          <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
          <br />
          <div>
            <label>
              Email*:
              <input
                type="text"
                name="email"
                defaultValue={email}
                id="email"
                placeholder="Enter email"
                onChange={this.handleOnchange}
                required
              />
            </label>
          </div>
          <br />
          <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
          <br />
          <div>
            <label>
              Password*:
              <input
                type="password"
                name="password"
                defaultValue={password}
                id="password"
                placeholder="Enter password"
                onChange={this.handleOnchange}
                required
              />
            </label>
          </div>
          <br />
          <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
          <br />
          <div>
            <label>
              Confirm_Password*:
              <input
                type="password"
                name="confirm_password"
                defaultValue={confirm_password}
                id="confirm_password"
                placeholder="Enter password"
                onChange={this.handleOnchange}
                required
              />
            </label>
          </div>
          <br />
          <span style={{ color: "red" }}>
            {this.state.errors["confirm_password"]}
          </span>
          <br />
          <div>
            <label>
              <input
                type="checkbox"
                defaultChecked={remember}
                onChange={this.handleOnchange}
                name="remember"
                id="remember"
                required
              />
              I agree terms and condition*
            </label>
          </div>
          <button type="submit" style={{ marginTop: "8px" }}>
            Register
          </button>
          <div>
            <Link to="/" style={{ marginTop: "8px" }}>
              Log in
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Registration;
