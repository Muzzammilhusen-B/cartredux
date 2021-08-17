import React from "react";
import {
  Layout,
  Menu,
  Image,
  message,
  // Card,
  // Tag,
  // Popover,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Table,
  Tooltip,
} from "antd";
import logo from "./logo.png";
// import { Link } from "react-router-dom";
import {
  HomeFilled,
  LogoutOutlined,
  AppstoreAddOutlined,
  FileAddOutlined,
  // InfoCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Footerbar from "./Footer";
import { connect } from "react-redux";
import { loadFromLocalStorage } from "../localStorage";
import { addProduct } from "../actions";

const { TextArea } = Input;
const { Header, Content, Sider } = Layout;
// const { Meta } = Card;
class DisplayProduct extends React.Component {
  state = {
    categoryName: "",
    id: 0,
    name: "",
    company: "",
    price: 0,
    amount: 1,
    description: "",
    image: "",
    collapsed: false,
    isModalVisible: false,
  };
  componentDidMount() {
    loadFromLocalStorage();
  }
  componentDidUpdate() {
    localStorage.setItem("cartState", JSON.stringify(this.props.state));
  }
  redirectLoginHome = (e) => {
    // e.preventDefault();
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
  redirectAdmin = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome/admin");
  };
  redirecctCategory = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome/admin/category");
  };
  redirecctProduct = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome/admin/product");
  };
  handleOnChange = (e) => {
    // console.log("clicked", event);
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log("this dot state", this.state);
  };
  handleCategory = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome/admin/category");
  };

  handleProduct = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome/admin/product");
  };
  //add product
  addProduct = () => {
    this.setState({ isModalVisible: true });
  };
  handleOk = (value) => {
    console.log("value", value);
    const data = this.state;
    console.log("to send reducer", data);
    const items = this.props.items;
    console.log("items to be", items);
    items.push(data);
    this.props.addProduct(data);
    // this.props.addCategory(id);
    this.setState({ isModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const {
      collapsed,
      categoryName,
      id,
      company,
      price,
      amount,
      description,
      name,
      image,
    } = this.state;
    const items = this.props.items;
    const columns = [
      {
        title: "Category Name",
        key: "categoryName",
        dataIndex: "categoryName",
        width: 100,
      },
      {
        title: "ID",
        key: "id",
        dataIndex: "id",
        width: 50,
      },
      {
        title: "Name",
        key: "name",
        dataIndex: "name",
        width: 100,
      },
      {
        title: "Company",
        key: "company",
        dataIndex: "company",
        width: 130,
      },
      {
        title: "Price(₹).",
        key: "price",
        dataIndex: "price",
        width: 120,
      },
      {
        title: "Qty.",
        key: "amount",
        dataIndex: "amount",
        width: 60,
      },
      {
        title: "Description",
        key: "description",
        dataIndex: "description",
        ellipsis: { showTitle: false },
        render: (description) => (
          <Tooltip title={description} placement="topLeft">
            {description}
          </Tooltip>
        ),
      },
      // {
      //   title: "Image",
      //   key: "image",
      //   dataIndex: "image",
      // },
    ];

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
              <Image
                src={logo}
                width={"150px"}
                preview={false}
                onClick={this.redirectLoginHome}
              />
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ background: "white", float: "right" }}
            >
              <Menu.Item
                key="1"
                onClick={this.redirectLoginHome}
                icon={<HomeFilled />}
              >
                Home
              </Menu.Item>
              <Menu.Item key="2" onClick={this.redirectAdmin}>
                Admin
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={this.redirectLogout}
                icon={<LogoutOutlined />}
              >
                Log out
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <Layout
          style={{
            background:
              "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
            filter:
              "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
            marginTop: "65px",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            height: "relative",
            maxWidth: "100%",
          }}
        >
          <Sider
            style={{}}
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="dark">
              <Menu.Item
                key="1"
                id={1}
                icon={<AppstoreAddOutlined />}
                onClick={this.redirecctCategory}
              >
                Categories
              </Menu.Item>
              <Menu.Item
                key="2"
                id={2}
                icon={<FileAddOutlined />}
                onClick={this.redirecctProduct}
              >
                Products
              </Menu.Item>
            </Menu>
          </Sider>

          <Content
            style={{
              padding: "20px",
              alignContent: "center",
              maxWidth: "100%",
            }}
          >
            <div style={{ float: "right", marginBottom: "20px" }}>
              <Button type="primary" onClick={this.addProduct}>
                Add Product
              </Button>
            </div>
            <Table
              // bordered
              columns={columns}
              dataSource={items}
              style={{ overflowX: "auto" }}
              pagination={{ defaultPageSize: 10 }}
            />
            {/* <Card
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
                    <Popover
                      placement="bottomRight"
                      title={item.name}
                      content={item.description}
                    >
                      <Tag color="blue" icon={<InfoCircleOutlined />}>
                        Description
                      </Tag>
                    </Popover>
                  </Card> */}

            <Modal
              title="Add Product"
              visible={this.state.isModalVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form>
                <Form.Item
                  label="Category Name"
                  value={categoryName}
                  name="categoryName"
                  rules={[
                    {
                      required: true,
                      message: "Please input category name!",
                    },
                  ]}
                >
                  <Input name="categoryName" onChange={this.handleOnChange} />
                </Form.Item>
                <Form.Item
                  label="Category ID"
                  value={id}
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Please input category id!",
                    },
                  ]}
                >
                  <Input name="id" onChange={this.handleOnChange} />
                </Form.Item>
                <Form.Item
                  label="Product Name"
                  name="name"
                  value={name}
                  rules={[
                    {
                      required: true,
                      message: "Please input product name!",
                    },
                  ]}
                >
                  <Input name="name" onChange={this.handleOnChange} />
                </Form.Item>{" "}
                <Form.Item
                  label="Product Company"
                  name="company"
                  value={company}
                  rules={[
                    {
                      required: true,
                      message: "Please input company name!",
                    },
                  ]}
                >
                  <Input name="company" onChange={this.handleOnChange} />
                </Form.Item>{" "}
                <Form.Item
                  initialValue="1"
                  label="Product Amount"
                  name="amount"
                  value={amount}
                  rules={[
                    {
                      required: true,
                      message: "Please input product amount",
                    },
                  ]}
                >
                  <Input
                    name="amount"
                    type="number"
                    onChange={this.handleOnChange}
                  />
                </Form.Item>{" "}
                <Form.Item
                  label="Product Price in ₹."
                  name="price"
                  value={price}
                  rules={[
                    {
                      required: true,
                      message: "Please input product price!",
                    },
                  ]}
                >
                  <Input
                    name="price"
                    type="number"
                    onChange={this.handleOnChange}
                  />
                </Form.Item>{" "}
                <Form.Item
                  label="Product Description"
                  name="description"
                  value={description}
                  rules={[
                    {
                      required: true,
                      message: "Please input product description!",
                    },
                  ]}
                >
                  <TextArea
                    rows={6}
                    name="description"
                    onChange={this.handleOnChange}
                  />
                </Form.Item>
                <Form.Item
                  label="Image"
                  name="image"
                  value={image}
                  rules={[
                    {
                      required: true,
                      message: "Please upload Image",
                    },
                  ]}
                >
                  <Upload name="image" onChange={this.handleOnChange}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
        <Footerbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state: state, items: state.items };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (data) => {
      dispatch(addProduct(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayProduct);
