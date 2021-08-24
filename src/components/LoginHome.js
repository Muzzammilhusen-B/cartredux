import React from "react";
import Footerbar from "./Footer";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
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
  Input,
  Drawer,
} from "antd";
import {
  ShoppingCartOutlined,
  PlusCircleTwoTone,
  CaretDownOutlined,
  HomeFilled,
  LogoutOutlined,
  InfoCircleOutlined,
  DownOutlined,
  FilterTwoTone,
} from "@ant-design/icons";
import {
  addToCart,
  addQuantity,
  subQuantity,
  fetchData,
  home,
  allCategory,
  searchItem,
} from "../actions/index";
import logo from "./logo.png";
import { connect } from "react-redux";
// import Navbar from "./Navbar";
import // loadFromLocalStorage,
//  saveToLocalStorage
"../localStorage";
// import { withRouter } from "react-router-dom";

const { Header, Content } = Layout;
const { Meta } = Card;
const { SubMenu } = Menu;
const { Search } = Input;

class LoginHome extends React.Component {
  state = { count: 0, product: [], visible: false, placement: "left" };

  componentDidMount() {
    // saveToLocalStorage();
    this.props.fetchData(this.props.state);
    localStorage.setItem("cartState", JSON.stringify(this.props.state));
  }
  componentDidUpdate() {
    // localStorage.setItem("cartState", JSON.stringify(this.props.state));
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

  handleSubtractQunatity = (id) => {
    this.props.subQuantity(id);
    this.setState({ count: this.props.items.quantity - 1 });
    const error = () => {
      message.error("Item quantity decreased !");
    };
    error();
  };
  //General category display

  handleAllCategory = (id) => {
    console.log("Id clicked in all", id);
    console.log("BEFORE STATE", this.props.state);
    this.props.allCategory(id);
    localStorage.setItem("cartState", JSON.stringify(this.props.state));

    this.setState({ visible: false });
  };
  //drawer
  showDrawer = () => {
    this.setState({ visible: true });
  };
  //on drawer close
  onClose = () => {
    this.setState({ visible: false });
  };
  //on serach bar
  onSearch = (value) => {
    console.log("search value", value);
    this.props.searchItem(value);
  };

  render() {
    // if (saveToLocalStorage()) return <div>Loading..</div>;

    const product = this.props.items;
    const category = this.props.category;
    const { placement, visible } = this.state;

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
              <SubMenu key="cat1" title="Categories" icon={<DownOutlined />}>
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
              </SubMenu>

              <Menu.Item
                key="1234"
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
              <Menu.Item key="12345">
                <Link to="/loginhome/admin">Admin</Link>
              </Menu.Item>
              <Menu.Item
                key="1123456"
                onClick={this.redirectLogout}
                icon={<LogoutOutlined />}
              >
                Log out
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <hr />

        <Layout
          // className="content"
          style={{
            height: "relative",
            background:
              "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
            filter:
              "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
          }}
        >
          <div style={{ float: "right" }}>
            <Space align="end" style={{ marginTop: "50px", padding: "20px" }}>
              <Button
                icon={<FilterTwoTone style={{ fontSize: "15px" }} />}
                type="primary"
                onClick={this.showDrawer}
              >
                Categories
              </Button>
              <Drawer
                title="Filter Categories"
                placement={placement}
                key={placement}
                visible={visible}
                closable={false}
                onClose={this.onClose}
              >
                {category.map((item) => {
                  return (
                    <Menu key={item.cat_id}>
                      <Menu.Item
                        key={item.cat_id}
                        id={item.cat_id}
                        onClick={() => this.handleAllCategory(item.cat_id)}
                      >
                        {item.cat_name}
                      </Menu.Item>
                    </Menu>
                  );
                })}
              </Drawer>
              <Search
                style={{
                  width: "450px",
                }}
                maxLength={20}
                placeholder="Input Search Item Name"
                allowClear
                enterButton="Search"
                size="middle"
                onSearch={this.onSearch}
              />
            </Space>
          </div>
          <div
            style={{
              // marginTop: "50px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              height: "relative",
              maxWidth: "100%",
              justifyContent: "space-around",
              alignContent: "space-around",

              padding: "20px",
              // marginBottom: "10px",
            }}
          >
            {product.map((item) => {
              const addedItems = this.props.addedItems;
              // console.log("Added item for quantity update", addedItems);
              return (
                <Content key={item.id} style={{}}>
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
                      marginTop: "10px",
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
                          style={{ float: "left" }}
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
                            style={{ float: "right" }}
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
          </div>
          <hr />
        </Layout>

        {/* footer from resuable component footerbar */}
        <Footerbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("loginhome redux store state", state);
  return {
    state: state,
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
    searchItem: (value) => {
      dispatch(searchItem(value));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginHome);
