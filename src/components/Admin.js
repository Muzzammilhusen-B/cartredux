import React from "react";
// import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import Footerbar from "./Footer";
import {
  // Input,
  Layout,
  Menu,
  // Form, Modal,
  Image,
  //  Table,
  message,
} from "antd";
import "antd/dist/antd.css";
import {
  AppstoreAddOutlined,
  FileAddOutlined,
  HomeFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { addCategory } from "../actions";

const { Header, Content, Sider } = Layout;

class Admin extends React.Component {
  state = {
    collapsed: false,
    isModalVisible: false,
  };
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
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  //add category modal
  handleCategory = () => {
    // console.log("add category clicked");
    // this.setState({ isModalVisible: true });
    const { history } = this.props;
    if (history) history.push("/loginhome/admin/category");
  };

  //add product modal
  handleProduct = () => {
    // console.log("add product clicked");
    // this.setState({ isModalVisible: true });
    const { history } = this.props;
    if (history) history.push("/loginhome/admin/product");
  };
  //handle ok
  handleOk = (data) => {
    // console.log("data", data);
    this.setState({ isModalVisible: false });
  };
  //handle calcel
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  //field change and store
  handleFieldChange = (field) => {
    // console.log("field", field);
    // const addCategory = field.map((item) => item.value);
    // // console.log(JSON.stringify(addCategory));
    // // console.log("Store category", this.props.category);
    // this.props.addCategory(field);
  };
  //finish
  handleOnFinish = (value) => {
    console.log("value", value);
  };

  render() {
    const { collapsed } = this.state;

    return (
      <div>
        {/* <Navbar /> */}
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
              <Link to="/loginhome">
                <Image src={logo} width={"150px"} preview={false} />
              </Link>
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
              <Menu.Item
                key="2"
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
            height: "690px",
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
                onClick={this.handleCategory}
              >
                Categories
              </Menu.Item>
              <Menu.Item
                key="2"
                id={2}
                icon={<FileAddOutlined />}
                onClick={this.handleProduct}
              >
                Products
              </Menu.Item>
            </Menu>
          </Sider>

          <Content></Content>
        </Layout>

        <Footerbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    addCategory: (id) => {
      dispatch(addCategory(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchProps)(Admin);

// <Modal
//               title="Add New Category"
//               visible={this.state.isModalVisible}
//               onOk={(id) => this.handleOk(id)}
//               onCancel={this.handleCancel}
//             >
//               <div>
//                 <Form
//                   name="New category"
//                   onFinish={this.handleOnFinish}
//                   onFieldsChange={this.handleFieldChange}
//                 >
//                   <Form.Item
//                     label="Category Name"
//                     name="cat_name"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please input category name!",
//                       },
//                     ]}
//                   >
//                     <Input />
//                   </Form.Item>
//                   <Form.Item
//                     label="Category Id"
//                     name="cat_id"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please input category Id!",
//                       },
//                     ]}
//                   >
//                     <Input />
//                   </Form.Item>
//                 </Form>
//               </div>
//             </Modal>
