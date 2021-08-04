import React from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import Navbar from "./Navbar";
import {
  Layout,
  //  Menu,
  Image,
  Descriptions,
  Button,
  // Badge
} from "antd";
import {
  // ShoppingCartOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
// import logo from "./logo.png";
import { addToCart } from "../actions";

// import { withRouter } from "react-router-dom";

const {
  //  Header,
  Content,
  Footer,
} = Layout;

class CartDetails extends React.Component {
  state = {
    product: [],
    count: 0,
    amount: 0,
  };
  componentDidMount() {
    const product = this.props.items;
    console.log(" mounted added items", product);
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
    let product = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <div key={item.id}>
            {/* <Navbar /> */}

            {/* <Layout className="layout">
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
                      count={this.props.count}
                      className="head-example"
                    ></Badge>
                  </Menu.Item>
                  <Menu.Item key="3" onClick={this.redirectLogout}>
                    Log out
                  </Menu.Item>
                </Menu>
              </Header>
            </Layout> */}
            <Layout className="content">
              <Content
                className="site-layout-background"
                style={{ marginTop: ``, justifyContent: "center" }}
              >
                <li key={item.id}>
                  <div
                    className="site-layout-background"
                    style={{ textAlign: "center" }}
                  >
                    <Descriptions
                      title={`${item.company} ${item.name}`}
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
                            alt={item.name}
                            width={"250px"}
                            height={"250px"}
                            src={item.image}
                          />
                          {/* {item.description} */}
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
                      value={this.props.count}
                      disabled={this.props.count === 0 ? true : ""}
                      onClick={this.handleDecrease}
                      icon={<MinusCircleOutlined />}
                    >
                      Decrease
                    </Button>{" "}
                    <Button
                      type="primary"
                      value={this.props.product}
                      onClick={this.handleRemove}
                      icon={<DeleteOutlined />}
                    >
                      Remove
                    </Button>{" "}
                  </div>
                </li>
              </Content>
            </Layout>
            <Layout>
              <Footer style={{ textAlign: "center" }}>
                User Form Design ©2021.
              </Footer>
            </Layout>
          </div>
        );
      })
    ) : (
      <p>Nothing..</p>
    );
    return (
      <div>
        <Navbar />
        <h1 style={{ marginTop: "200px" }}>You have ordered</h1>
        <ul>{product}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("cartdetails connect function items state", state);
  return { items: state.addedItems, count: state.count };
};
const mapStateToDispatch = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(CartDetails);
