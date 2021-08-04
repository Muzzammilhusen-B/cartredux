import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Image, Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import logo from "./logo.png";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
  redirectLoginHome = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome");
  };
  redirectLogout = () => {
    const { history } = this.props;
    if (history) history.push("/");
  };
  redirectToCart = () => {
    const { history } = this.props;
    if (history) history.push(`/loginhome/cart`);
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
              <Menu.Item key="3" style={{ float: "right" }}>
                <Button
                  type="primary"
                  onClick={this.redirectToCart}
                  icon={<ShoppingCartOutlined />}
                >
                  <Badge count={1} className="head-example">
                    Cart{" "}
                  </Badge>
                </Button>
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={this.redirectLogout}
                style={{ float: "right" }}
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

export default Header;
