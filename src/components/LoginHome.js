import React from "react";
import "antd/dist/antd.css";
import {
  Layout,
  Menu,
  Image,
  Card,
  Button,
  Badge,
  // InputNumber,
  Descriptions,
  Carousel,
} from "antd";
import {
  ShoppingCartOutlined,
  PlusCircleOutlined,
  CaretDownOutlined,
  // CaretUpOutlined,
} from "@ant-design/icons";
import {
  addToCart,
  addQuantity,
  subQuantity,
  fetchData,
} from "../actions/index";
import logo from "./logo.png";
import { connect } from "react-redux";
// import Navbar from "./Navbar";
import {
  //  loadFromLocalStorage,
  saveToLocalStorage,
} from "../localStorage";
// import { saveToLocalStorage } from "../localStorage";
// import { withRouter } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

class LoginHome extends React.Component {
  state = { count: 0, product: [] };

  componentDidMount() {
    // saveToLocalStorage();
    this.props.fetchData(saveToLocalStorage());
    console.log("this porps mounted items", this.props.items);
  }

  redirectLoginHome = (e) => {
    // e.preventDefault();

    const { history } = this.props;
    if (history) history.push("/loginhome");
  };
  redirectLogout = () => {
    const { history } = this.props;
    if (history) history.push("/");
  };

  redirectToCartDisplay = (id, e) => () => {
    // e.preventDefault();
    // console.log("for cart id", items);
    // const { id } = items;
    this.setState({ count: this.props.count + 1 });
    this.props.addToCart(id);

    // const { history } = this.props;
    // if (history) history.push(`/loginhome/cart/`);
  };
  redirectToCart = () => {
    // e.preventDefault();
    // const { id } = items;

    const { history } = this.props;
    if (history) history.push(`/loginhome/cart/`);
  };
  //
  onChange = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // handleAddQunatity = (id) => {
  //   this.props.addQuantity(id);
  // };
  handleSubtractQunatity = (id) => {
    this.props.subQuantity(id);
    this.setState({ count: this.props.items.quantity - 1 });
  };

  render() {
    if (saveToLocalStorage()) return <div>Loading..</div>;

    // console.log("this porps renderd items", this.props.items);
    const product = this.props.items;

    return (
      <div>
        <Layout className="layout">
          <Header
            className="header"
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              // background: "black",
            }}
          >
            <div className="logo">
              <Image src={logo} width={"250px"} />
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ background: "#7BFEDB" }}
            >
              <Menu.Item key="1" onClick={this.redirectLoginHome}>
                Home
              </Menu.Item>
              <Menu.Item key="2" style={{ float: "right" }}>
                <Button
                  type="primary"
                  onClick={this.redirectToCart}
                  icon={<ShoppingCartOutlined />}
                  // onChange={this.onChange}
                  // disabled={this.state.count >= 5 ? true : ""}
                >
                  <Badge
                    count={this.props.count > 0 ? this.props.count : ""}
                    className="head-example"
                  >
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
          {/* </Layout> */}
          {/* <Navbar /> */}
          <hr />

          <Layout
            className="content"
            style={{
              background: "#E1FCEC",
            }}
          >
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Carousel autoplay>
                {product.map((item) => {
                  // console.log(item);
                  return (
                    // <ul key={item.id}>
                    <div key={item.id}>
                      {/* <li value={item}> */}
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
                          description={`Price :${item.price} ₹.`}
                          style={{ justifyContent: "center" }}
                        />
                      </Card>
                      <Descriptions.Item>{item.description}</Descriptions.Item>
                      {/* </li> */}
                      <span>
                        <h3 style={{ marginTop: "10px" }}>
                          Quantity:
                          {/* <CaretUpOutlined
                        disabled={item.quantity >= 5 ? true : ""}
                        onClick={() => {
                          this.handleAddQunatity(item.id);
                        }}
                      /> */}
                          {/* {item.quantity} */}
                          {` ${
                            this.props.count === 0 ||
                            item.quantity === undefined
                              ? 0
                              : `${item.quantity}`
                          }`}
                          <Button
                            onClick={() => {
                              this.handleSubtractQunatity(item.id);
                            }}
                            icon={<CaretDownOutlined disabled />}
                            disabled={this.props.count <= 0 ? true : ""}
                          >
                            Decreasec qty.
                          </Button>
                        </h3>
                        <Button
                          key={item.id}
                          icon={<PlusCircleOutlined />}
                          value={item.quantity}
                          type="primary"
                          onClick={this.redirectToCartDisplay(item.id)}
                          disabled={item.quantity >= 5 ? true : ""}
                        >
                          Add {item.name} to Cart
                        </Button>
                      </span>
                    </div>
                  );
                })}
              </Carousel>
              <strong>Total: </strong>
              {this.props.total}
            </Content>
          </Layout>
          {/* <Layout> */}
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
  return {
    items: state.items,
    count: state.count,
    total: state.total,
    addedItems: state.addedItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data) => {
      dispatch(fetchData(data));
    },
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    subQuantity: (id) => {
      dispatch(subQuantity(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginHome);
