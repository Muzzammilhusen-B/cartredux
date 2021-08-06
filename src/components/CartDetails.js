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
import { addQuantity, addToCart, subQuantity, remove } from "../actions";

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
  componentDidMount(e) {
    if (e) e.preventDefault();
    const product = this.props.items;
    console.log(" mounted added items", product);
  }
  redirectLoginHome = (e) => {
    e.preventDefault();
    const { history } = this.props;
    if (history) history.push("/loginhome");
  };
  redirectLogout = () => {
    console.log(
      "logout state",
      localStorage.setItem("cartState", JSON.stringify(this.props))
    );
    const { history } = this.props;
    if (history) history.push("/");
  };
  handleIncrease = (e) => {
    // e.preventDefault();
    const { id } = this.props.items;
    this.props.addQuantity(id);

    this.setState({ count: this.state.count + 1 });
  };
  handleDecrease = (e, items) => {
    // e.preventDefault();
    const { id } = items;
    this.props.subQuantity(id);

    this.setState({ count: this.state.count - 1 });
  };
  handleRemove = (id) => {
    // const { id } = this.props.state.addedItems;
    // console.log("Selected remove item", this.props.state.addedItems);
    // e.preventDefault();
    this.props.remove(id);
    // this.setState({ product: [] });
  };

  render() {
    let product = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
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
                      title={`${item.quantity} nos. of ${item.company} ${item.name}`}
                      layout="vertical"
                      style={{ marginTop: "10px" }}
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
                          <span>
                            <p>Price: {item.price} ₹.</p>
                            <p>Quantity: {item.quantity}</p>
                          </span>{" "}
                          {/* {item.description} */}
                        </div>
                      </Descriptions.Item>
                    </Descriptions>
                    {/* <Button
                      type="primary"
                      // onClick={this.handleIncrease}
                      icon={<PlusCircleOutlined />}
                    >
                      Increase
                    </Button>{" "} */}
                    {/* <Button
                      type="primary"
                      value={item.quantity}
                      disabled={item.quantity === 1 ? true : ""}
                      // onClick={this.handleDecrease}
                      icon={<MinusCircleOutlined />}
                      // onClick={(e) =>
                      //   console.log("decrease button clicked", e.target.value)
                      // }
                    >
                      Decrease
                    </Button>{" "} */}
                    <Button
                      type="primary"
                      value={this.props.product}
                      onClick={() => {
                        this.handleRemove(item.id);
                      }}
                      icon={<DeleteOutlined />}
                    >
                      Remove
                    </Button>{" "}
                  </div>
                </li>
              </Content>
            </Layout>
          </div>
        );
      })
    ) : (
      <p>Nothing...! :(</p>
    );
    let total = this.props.total;

    console.log("All total", total);
    return (
      <div>
        <Navbar />
        <Layout>
          <Content>
            <h1 style={{ marginTop: "200px" }}>You have ordered</h1>
            <ul>{product}</ul>
            {total === 0 ? (
              ""
            ) : (
              <p>
                <strong>Total amount:</strong> {total} ₹.
              </p>
            )}
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
  return {
    // state: state,
    items: state.addedItems,
    count: state.count,
    total: state.total,
  };
};
const mapStateToDispatch = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    subQuantity: (id) => {
      dispatch(subQuantity(id));
    },
    remove: (id) => {
      dispatch(remove(id));
    },
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(CartDetails);
