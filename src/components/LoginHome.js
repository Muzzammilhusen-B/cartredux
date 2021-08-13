import React from "react";
import Footerbar from "./Footer";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
// import "./loginhome.css";
import {
  Layout,
  Menu,
  Image,
  Card,
  Badge,
  message,
  Divider,
  Space,
  Popover,
  Tag,
  Button,
} from "antd";
import {
  ShoppingCartOutlined,
  PlusCircleTwoTone,
  CaretDownOutlined,
  HomeFilled,
  LogoutOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  addToCart,
  addQuantity,
  subQuantity,
  fetchData,
  home,
  allCategory,
} from "../actions/index";
import logo from "./logo.png";
import { connect } from "react-redux";
// import Navbar from "./Navbar";
import {
  //  loadFromLocalStorage,
  saveToLocalStorage,
} from "../localStorage";
// import SubMenu from "antd/lib/menu/SubMenu";
// import { saveToLocalStorage } from "../localStorage";
// import { withRouter } from "react-router-dom";

const { Header, Content } = Layout;
const { Meta } = Card;

class LoginHome extends React.Component {
  state = { count: 0, product: [] };

  componentDidMount() {
    // saveToLocalStorage();
    this.props.fetchData(saveToLocalStorage());
    // console.log("this porps mounted items", this.props.items);
  }

  redirectLoginHome = (e, data) => {
    // e.preventDefault();
    this.props.home(data);
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

  redirectToCartDisplay = (id, e) => () => {
    // e.preventDefault();
    // console.log("for cart id", items);
    // const { id } = items;
    this.setState({ count: this.props.count + 1 });
    this.props.addToCart(id);
    const success = () => {
      message.success("Added to cart");
    };
    success();
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
  //General category display

  handleAllCategory = (id) => {
    console.log("Id clicked in all", id);
    this.props.allCategory(id);
  };

  render() {
    if (saveToLocalStorage()) return <div>Loading..</div>;

    const product = this.props.items;
    const category = this.props.category;
    // console.log(
    //   "category name",
    //   category.map((item) => item.cat_name)
    // );

    const addedItems = this.props.addedItems.length;
    // console.log("added item length", addedItems);

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
              // background: "linear-gradient(180deg, #FFC0CB 50%, #00FFFF 50%)",
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
                <Image preview={false} src={logo} width={"150px"} />
              </Link>
            </div>
            <Menu mode="horizontal" style={{ float: "right" }}>
              <Menu.Item
                key="0"
                onClick={this.redirectLoginHome}
                icon={<HomeFilled />}
              >
                Home
              </Menu.Item>
              {category.map((item) => {
                return (
                  <Menu.Item
                    key={item.cat_id}
                    id={item.cat_id}
                    onClick={() => this.handleAllCategory(item.cat_id)}
                  >
                    {item.cat_name}
                  </Menu.Item>
                );
              })}
              <Menu.Item
                key="8"
                onClick={this.redirectToCart}
                icon={<ShoppingCartOutlined />}
                style={{ float: "right" }}
              >
                <Badge
                  count={this.props.count > 0 ? addedItems : ""}
                  className="head-example"
                >
                  Cart{" "}
                </Badge>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to="/loginhome/products">Products</Link>
              </Menu.Item>
              <Menu.Item
                key="10"
                onClick={this.redirectLogout}
                // style={{ float: "right" }}
                icon={<LogoutOutlined />}
              >
                Log out
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <hr />

        <Layout
          className="content"
          style={{
            background:
              "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
            filter:
              "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            height: "relative",
            maxWidth: "100%",
            justifyContent: "space-around",
            alignContent: "space-around",

            padding: "10px",
            // marginBottom: "10px",
          }}
        >
          {product.map((item) => {
            const addedItems = this.props.addedItems;
            // console.log("Added item for quantity update", addedItems);
            return (
              <Content key={item.id} style={{}}>
                {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col className="gutter-row" span={6}> */}
                <Card
                  value={item}
                  id={item.id}
                  hoverable
                  alt={item.name}
                  style={{
                    justifyContent: "space-around",
                    maxHeight: "400px",
                    padding: "2%",
                    flex: "0 0 200px",
                    marginTop: "20px",
                    maxWidth: "200px",
                    marginBottom: "10px",
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
                    description={`Price :${item.price} ₹.`}
                    style={{ justifyContent: "center" }}
                  />

                  <Divider orientation="center" style={{ color: "black" }}>
                    <Space>
                      <Button
                        value={item.quantity}
                        onClick={this.redirectToCartDisplay(item.id)}
                        disabled={item.quantity === 5 ? true : ""}
                      >
                        <PlusCircleTwoTone style={{ fontSize: "20px" }} />
                      </Button>
                      {` ${
                        addedItems === 0 || item.quantity === undefined
                          ? 0
                          : `${item.quantity}`
                      }`}
                      {item.quantity === 0 ? (
                        ""
                      ) : (
                        <Button
                          disabled={item.quantity === 0 ? true : ""}
                          onClick={() => {
                            this.handleSubtractQunatity(item.id);
                          }}
                        >
                          <CaretDownOutlined style={{ fontSize: "20px" }} />
                        </Button>
                      )}
                    </Space>{" "}
                  </Divider>

                  <Popover
                    placement="bottomRight"
                    title={item.name}
                    content={item.description}
                  >
                    <Tag color="blue" icon={<InfoCircleOutlined />}>
                      Description
                    </Tag>
                  </Popover>
                </Card>
              </Content>
            );
          })}
          <hr />
          {/* <strong>Total: {this.props.total} ₹. </strong> */}
        </Layout>

        {/* footer from resuable component footerbar */}
        <Footerbar />
        {/* </Layout> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("loginhome redux store state", state);
  return {
    category: state.category,
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

    allCategory: (id) => {
      dispatch(allCategory(id));
    },
    home: (data) => {
      dispatch(home(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginHome);
