import React from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Layout, Menu, Image, Descriptions, Button, Badge } from "antd";
import {
  ShoppingCartOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import logo from "./logo.png";
import { addToCart } from "../actions";

// import { withRouter } from "react-router-dom";

const { Header, Content, Footer } = Layout;

class CartDetails extends React.Component {
  state = {
    product: [],
    count: 0,
    amount: 0,
  };
  componentDidMount() {
    const product = this.props.items;
    // console.log("cart detail mounted props", product);
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
    const product = this.props.items;
    // console.log("render ", product);
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
                <ShoppingCartOutlined />
                <Badge
                  count={this.state.count}
                  className="head-example"
                ></Badge>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.redirectLogout}>
                Log out
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <Layout className="content">
          <Content
            className="site-layout-background"
            style={{ marginTop: `200px`, justifyContent: "center" }}
          >
            <div
              className="site-layout-background"
              style={{ textAlign: "center" }}
            >
              <Descriptions
                title={`${product.company} ${product.name}`}
                layout="vertical"
              >
                <Descriptions.Item>
                  <div
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "30%",
                    }}
                  >
                    <Image
                    // alt={product.name}
                    // width={"500px"}
                    // height={"500px"}
                    // src={product.image}
                    />
                    {/* {product.description} */}
                  </div>
                </Descriptions.Item>
              </Descriptions>
              <Button
                type="primary"
                onClick={this.handleIncrease}
                icon={<PlusCircleOutlined />}
              >
                Increase
              </Button>{" "}
              <Button
                type="primary"
                value={this.state.count}
                disabled={this.state.count === 0 ? true : ""}
                onClick={this.handleDecrease}
                icon={<MinusCircleOutlined />}
              >
                Decrease
              </Button>{" "}
              <Button
                type="primary"
                value={this.state.product}
                onClick={this.handleRemove}
                icon={<DeleteOutlined />}
              >
                Remove
              </Button>{" "}
            </div>
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
  console.log("cartdetails connect function items state", state);
  return { items: state.items };
};
const mapStateToDispatch = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(CartDetails);
