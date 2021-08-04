import React from "react";
import { Layout, Image, Menu } from "antd";
import logo from "./logo.png";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

class Cart extends React.Component {
  state = {
    product: [],
  };
  componentDidMount() {
    const productData = JSON.parse(localStorage.getItem("product_obj"));
    // console.log(productData);
    this.setState({ product: productData });
  }
  redirectLoginHome = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome");
  };
  redirectLogout = () => {
    const { history } = this.props;
    if (history) history.push("/");
  };
  redirectToProduct = (item) => () => {
    const { id } = item;

    const { history } = this.props;
    if (history) history.push(`/loginhome/${id}`);
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
              <Menu.Item key="2" onClick={this.redirectToProduct}>
                Product List
              </Menu.Item>
              <Menu.Item key="3" onClick={this.redirectLogout}>
                Log out
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <h1>cart added</h1>
          </Content>
        </Layout>
        <Layout>
          <Footer style={{ textAlign: "center" }}>
            User Form Design ©2021.
          </Footer>
        </Layout>{" "}
      </div>
    );
  }
}

export default Cart;
