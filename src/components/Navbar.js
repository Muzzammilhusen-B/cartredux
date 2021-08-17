import React from "react";
import "antd/dist/antd.css";
import {
  Layout,
  Menu,
  Image,
  // Button,
  Badge,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  HomeFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "./logo.png";
import { Link, withRouter } from "react-router-dom";
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
    const success = () => {
      message.success("Log out successfully");
    };
    success();
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
    const addedItems = this.props.addedItems.length;
    return (
      <div>
        <Layout className="layout">
          <Header
            className="header"
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              background: "white",
            }}
          >
            <div
              className="logo"
              style={{
                float: "left",
                marginTop: "10px",
                display: "inline-block",
              }}
            >
              <Link to="/loginhome">
                <Image src={logo} width={"150px"} preview={false} />
              </Link>
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ background: "white", float: "right" }}
            >
              <Menu.Item
                key="1"
                onClick={this.redirectLoginHome}
                icon={<HomeFilled />}
              >
                Home
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={this.redirectToCart}
                icon={<ShoppingCartOutlined />}
              >
                {/* <Button
                  type="primary"
                  onClick={this.redirectToCart}
                  icon={<ShoppingCartOutlined />}
                  // onChange={this.onChange}
                  // disabled={this.state.count >= 5 ? true : ""}
                > */}
                <Badge
                  count={this.props.count > 0 ? addedItems : ""}
                  className="head-example"
                >
                  Cart{" "}
                </Badge>
                {/* </Button> */}
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={this.redirectLogout}
                icon={<LogoutOutlined />}
              >
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
    addedItems: state.addedItems,
  };
};
const mapDispatchToProps = () => {
  return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
