import React from "react";
import "antd/dist/antd.css";
import {
  Layout,
  Menu,
  Image,
  // Button,
  Badge,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import logo from "./logo.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { addQuantity, subQuantity, remove, addToCart } from "../actions";

const { Header } = Layout;

class Navbar extends React.Component {
  state = { count: 0 };
  componentDidMount() {
    console.log("count for cart", this.props.count);
    // this.props.addQuantity();
    // this.props.subQuantity();
    // this.props.remove();
    // this.props.addToCart();
  }
  redirectLoginHome = (e) => {
    // e.preventDefault();
    const { history } = this.props;
    if (history) history.push("/loginhome");
  };
  redirectLogout = () => {
    console.log(
      "logout state",
      localStorage.setItem("cartState", JSON.stringify(this.props))
    );
    localStorage.setItem("cartState", JSON.stringify(this.props));

    const { history } = this.props;
    if (history) history.push("/");
  };
  redirectToCart = () => {
    const { history } = this.props;
    if (history) history.push(`/loginhome/cart`);
  };
  handleIncrease = (e) => {
    e.preventDefault();

    this.setState({ count: this.state.count + 1 });
  };
  handleDecrease = (e) => {
    e.preventDefault();

    this.setState({ count: this.state.count - 1 });
  };
  handleRemove = (product, e) => {
    e.preventDefault();

    this.setState({ product: [] });
  };

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header
            className="header"
            style={{ position: "fixed", zIndex: 1, width: "100%" }}
          >
            <div className="logo">
              <Image src={logo} width={"250px"} />
            </div>
            <Menu theme="light" mode="horizontal">
              <Menu.Item key="1" onClick={this.redirectLoginHome}>
                Home
              </Menu.Item>
              <Menu.Item key="2">
                <ShoppingCartOutlined onClick={this.redirectToCart} />
                <Badge
                  count={this.props.count}
                  className="head-example"
                ></Badge>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.redirectLogout}>
                Log out
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("navbar console state", state);
  return {
    count: state.count,
  };
};
const mapDispatchToProps = () => {
  return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
