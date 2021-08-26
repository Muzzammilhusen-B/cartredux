import React from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import Navbar from "./Navbar";
import Footerbar from "./Footer";
import { Layout, Image, Button, message, Empty, Card, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { addQuantity, addToCart, subQuantity, remove } from "../actions";
import { Link } from "react-router-dom";

const { Meta } = Card;
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
    if (this.props.count === 0) {
      const deliveryState = [];
      localStorage.setItem("deliveryState", deliveryState);
    }
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
    this.props.remove(id);
    const success = () => {
      message.success("Item removed from cart");
    };
    success();
    // this.setState({ product: [] });
  };

  render() {
    let product =
      this.props.items.length && this.props.total !== 0 ? (
        this.props.items.map((item) => {
          return (
            // <Layout>
            //   <Content
            //     style={{
            //       background:
            //         "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",

            //       filter:
            //         "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
            //     }}
            //   >
            <Card
              key={item.id}
              value={item}
              id={item.id}
              hoverable
              alt={item.name}
              style={{
                alignContent: "space-between",
                maxHeight: "400px",
                // padding: "2%",
                // flex: "0 0 200px",
                marginTop: "20px",
                maxWidth: "200px",
                // marginBottom: "10px",
              }}
              cover={
                <Image
                  id={item.id}
                  alt={item.name}
                  src={item.image}
                  value={item}
                  style={{ height: "200px" }}
                />
              }
            >
              <Meta
                id={item.id}
                title={`${item.name} (${item.company})`}
                description={`Price :${item.price} ₹. Qty ${item.quantity}`}
                style={{ justifyContent: "center" }}
              />
              <Divider orientation="center" style={{ color: "black" }}>
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
              </Divider>
            </Card>
            //   </Content>
            // </Layout>
          );
        })
      ) : (
        // <Content>
        //   <div style={{ alignContent: "center" }}>
        //     <p>Nothing...! :(</p>
        <Empty description={<span>Empty Cart! Add item from Home</span>} />
        //   </div>
        // </Content>
      );
    let total = this.props.total;

    console.log("All total", total);
    return (
      <div>
        <Navbar />
        <Layout
          className="content"
          style={{
            height: "relative",
            // alignItems: "center",
            padding: "10px",
            background:
              "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
            filter:
              "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
          }}
        >
          <h1
            style={{
              marginTop: "60px",
              alignContent: "center",
            }}
          >
            You have ordered
          </h1>
          <div>
            {this.props.count === 0 ? (
              ""
            ) : this.props.items.quantity === 0 || Math.sign(total) === -1 ? (
              <strong>Total: "There is problem in reducer logic"</strong>
            ) : (
              <p>
                <strong>Total amount:</strong> {total} ₹.
                {this.props.count === 0 ? (
                  ""
                ) : (
                  <Link to="/loginhome/checkout/">
                    <Button type="primary" style={{ float: "right" }}>
                      Place Order
                    </Button>
                  </Link>
                )}
              </p>
            )}
          </div>
          <Content
          // style={{
          //   padding: "20px",
          //   display: "flex",
          //   flexWrap: "wrap",
          //   flexDirection: "row",
          //   alignItems: "center",
          // }}
          >
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {product}
            </div>
          </Content>
          <div>
            {this.props.count === 0 ? (
              ""
            ) : this.props.items.quantity === 0 || Math.sign(total) === -1 ? (
              <strong>Total: "There is problem in reducer logic"</strong>
            ) : (
              <p>
                <strong>Total amount:</strong> {total} ₹.
                {this.props.count === 0 ? (
                  ""
                ) : (
                  <Button type="primary" style={{ float: "right" }}>
                    Place Order
                  </Button>
                )}
              </p>
            )}
          </div>

          {/* footer from reusable component */}
        </Layout>
        <Footerbar />
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
