import React from "react";
import { connect } from "react-redux";
import "./cartDetails.css";
import "antd/dist/antd.css";
import Navbar from "./Navbar";
import Footerbar from "./Footer";
import {
  Layout,
  //  Menu,
  Image,
  Descriptions,
  Button,
  message,
  Empty,
  Row,
  Col,
  // Badge
} from "antd";
import {
  // ShoppingCartOutlined,
  // PlusCircleOutlined,
  // MinusCircleOutlined,
  // HeartFilled,
  DeleteOutlined,
} from "@ant-design/icons";
// import logo from "./logo.png";
import { addQuantity, addToCart, subQuantity, remove } from "../actions";

// import { withRouter } from "react-router-dom";

const {
  //  Header,
  Content,
  // Footer,
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
    const success = () => {
      message.success("Item removed from cart");
    };
    success();
    // this.setState({ product: [] });
  };

  render() {
    let product = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <div
            key={item.id}
            style={
              {
                // display: "flex",
                // flexWrap: "wrap",
                // flexDirection: "row",
              }
            }
          >
            <Layout
              className="content"
              style={
                {
                  // display: "flex",
                  // flexWrap: "wrap",
                  // flexDirection: "row",
                  // background: "#c1e0f7",
                }
              }
            >
              <Content
                className="site-layout-background"
                style={{
                  marginTop: ``,
                  justifyContent: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  // background: "#acdee7",
                  // background: "#E1FCEC",
                }}
              >
                {/* <li key={item.id}> */}
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
                {/* </li> */}
              </Content>
            </Layout>
          </div>
        );
      })
    ) : (
      <>
        <p>Nothing...! :(</p>
        <Empty description={<span>Empty Cart! Add item from Home</span>} />
      </>
    );
    let total = this.props.total;

    console.log("All total", total);
    return (
      <div>
        <Navbar />
        <Layout
          style={{
            // background: "#c1e0f7",

            background:
              "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",

            filter:
              "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",

            // background: "#acdee7",
            // background: "#E1FCEC",
          }}
        >
          <Content style={{ minHeight: "730px" }}>
            <h1 style={{ marginTop: "60px" }}>You have ordered</h1>

            {product}

            {this.props.items.quantity === 0 || total === 0 ? (
              ""
            ) : (
              <p>
                <strong>Total amount:</strong> {total} ₹.
              </p>
            )}
          </Content>

          {/* footer from reusable component */}
          <Footerbar />
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
