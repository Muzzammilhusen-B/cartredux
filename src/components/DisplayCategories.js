import React from "react";
import {
  Layout,
  Menu,
  Image,
  message,
  Table,
  Button,
  Input,
  Modal,
  Form,
} from "antd";
import logo from "./logo.png";
// import { Link } from "react-router-dom";
import {
  HomeFilled,
  LogoutOutlined,
  AppstoreAddOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import Footerbar from "./Footer";
import { connect } from "react-redux";
import { addCategory, removeCategory } from "../actions";
import { loadFromLocalStorage } from "../localStorage";

const { Header, Content, Sider } = Layout;

class DisplayCategory extends React.Component {
  state = {
    cat_name: "",
    cat_id: 0,
    collapsed: false,
    isModalVisible: false,
  };
  componentDidMount() {
    loadFromLocalStorage();
  }
  componentDidUpdate() {}
  redirectLoginHome = (e) => {
    // e.preventDefault();
    localStorage.setItem("cartState", JSON.stringify(this.props.state));
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
    // event.preventDefault();
    // console.log("event", e);
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // localStorage.setItem("category", JSON.stringify(this.state));
  };
  handleCategory = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome/admin/category");
  };

  handleProduct = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome/admin/product");
  };
  //for modal
  addCategory = () => {
    this.setState({ isModalVisible: true });
  };
  handleOk = (value) => {
    // console.log(" okvalue", value);
    // this.props.addCategory(value);
    // console.log("to send reducer", this.props.state);
    const data = this.state;
    const category = this.props.category;
    category.push(data);
    // console.log("to send reducer after push", this.props.state);

    // loadFromLocalStorage();
    // saveToLocalStorage().category.push(data);

    // category.push(data);
    this.props.addCategory(data);
    localStorage.setItem("cartState", JSON.stringify(this.props.state));

    this.setState({ isModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  handleRemove = (id) => {
    console.log("click for remove", id);
    this.props.removeCategory(id);
  };
  render() {
    const collapsed = this.state.collapsed;
    const category = this.props.category;
    // console.log(
    //   "Display category log",
    //   category.map((item) => item.cat_id)
    // );
    const columns = [
      {
        title: "Category Name",
        key: "cat_name",
        dataIndex: "cat_name",
      },
      {
        title: "Category ID",
        key: "cat_id",
        dataIndex: "cat_id",
      },
      {
        title: "Action",
        key: "remove",
        dataIndex: "",
        render: (category) => (
          <Button onClick={() => this.handleRemove(category.cat_id)}>
            Remove
          </Button>
        ),
      },
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
                key="801"
                onClick={this.redirectLoginHome}
                icon={<HomeFilled />}
              >
                Home
              </Menu.Item>
              <Menu.Item key="802" onClick={this.redirectAdmin}>
                Admin
              </Menu.Item>
              <Menu.Item
                key="803"
                onClick={this.redirectLogout}
                icon={<LogoutOutlined />}
              >
                Log out
              </Menu.Item>
            </Menu>
          </Header>
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
              height: "690px",
              maxWidth: "100%",
              marginBottom: "30px",
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
                  key="901"
                  id={1}
                  icon={<AppstoreAddOutlined />}
                  onClick={this.redirecctCategory}
                >
                  Categories
                </Menu.Item>
                <Menu.Item
                  key="902"
                  id={2}
                  icon={<FileAddOutlined />}
                  onClick={this.redirecctProduct}
                >
                  Products
                </Menu.Item>{" "}
              </Menu>
            </Sider>

            <Content
              style={{
                padding: "20px",
                alignContent: "center",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            >
              <div style={{ float: "right", marginBottom: "10px" }}>
                <Button type="primary" onClick={this.addCategory}>
                  Add Category
                </Button>
              </div>
              <Modal
                title="Add Category"
                visible={this.state.isModalVisible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
              >
                <Form>
                  <Form.Item
                    label="Category Name"
                    value={this.state.cat_name}
                    name="cat_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input category name!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      name="cat_name"
                      onChange={this.handleOnChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Category Id"
                    value={this.state.cat_id}
                    name="cat_id"
                    rules={[
                      {
                        required: true,
                        message: "Please input category Id!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="cat_id"
                      onChange={this.handleOnChange}
                    />
                  </Form.Item>
                </Form>
              </Modal>
              <Table
                key={1}
                columns={columns}
                dataSource={category}
                style={{ overflowX: "auto" }}
                pagination={{ defaultPageSize: 10 }}
              />
            </Content>
          </Layout>
          <Footerbar />
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("Display state", state);
  return { state: state, category: state.category };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (data) => {
      dispatch(addCategory(data));
    },
    removeCategory: (id) => {
      dispatch(removeCategory(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayCategory);
