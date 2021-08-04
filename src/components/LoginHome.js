import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Image, Card, Button, Badge, Descriptions } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart } from "../actions/index";
import logo from "./logo.png";
import { connect } from "react-redux";
// import { saveToLocalStorage } from "../localStorage";
// import { withRouter } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

class LoginHome extends React.Component {
  state = { count: 0, product: [] };
  componentDidMount() {
    console.log("this porps mounted items", this.props.items);
  }
  redirectLoginHome = (e) => {
    e.preventDefault();

    const { history } = this.props;
    if (history) history.push("/loginhome");
  };
  redirectLogout = () => {
    const { history } = this.props;
    if (history) history.push("/");
  };

  redirectToCartDisplay = (items, e) => () => {
    // e.preventDefault();
    console.log("for cart id", items);
    const { id } = items;
    this.props.addToCart(id);

    const { history } = this.props;
    if (history) history.push(`/loginhome/cart/:${id}`);
  };
  redirectToCart = (items, e) => () => {
    e.preventDefault();
    const { id } = items;

    const { history } = this.props;
    if (history) history.push(`/loginhome/cart/:${id}`);
  };

  render() {
    // console.log("this porps renderd items", this.props.items);
    const product = this.props.items;

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
              <Menu.Item key="2" style={{ float: "right" }}>
                <Button
                  type="primary"
                  onClick={this.redirectToCart}
                  icon={<ShoppingCartOutlined />}
                >
                  <Badge count={this.state.count} className="head-example">
                    Cart{" "}
                  </Badge>
                </Button>
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={this.redirectLogout}
                style={{ float: "right" }}
              >
                Log out
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>

        <hr />

        <Layout className="content">
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {product.map((item) => {
              // console.log(item);
              return (
                <ul key={item.id}>
                  <li value={item}>
                    <Card
                      value={item}
                      id={item.id}
                      hoverable
                      alt={item.name}
                      style={{
                        marginTop: "120px",
                        width: "300px",
                        alignContent: "inherit",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      cover={
                        <Image
                          id={item.id}
                          alt={item.name}
                          src={item.image}
                          value={item}
                        />
                      }
                    >
                      <Meta
                        id={item.id}
                        title={item.company}
                        description={`Price :${item.price} Rs.`}
                      />
                    </Card>
                    <Descriptions.Item>{item.description}</Descriptions.Item>
                  </li>{" "}
                  <Button
                    key={item.id}
                    value={item}
                    type="primary"
                    onClick={this.redirectToCartDisplay(item)}
                  >
                    Add {item.name} to Cart
                  </Button>
                </ul>
              );
            })}
          </Content>
        </Layout>
        <Layout>
          <Footer style={{ textAlign: "center" }}>
            User Form Design ©2021.
          </Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("loginhome redux store state", state);
  return { items: state.items };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginHome);
