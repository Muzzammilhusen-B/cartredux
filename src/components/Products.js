import React from "react";
import Navbar from "./Navbar";
import Footerbar from "./Footer";
import { Input, Layout, Menu, Form, Modal } from "antd";
import "antd/dist/antd.css";
import { AppstoreAddOutlined, FileAddOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addCategory } from "../actions";

const { Content, Sider } = Layout;

class Product extends React.Component {
  state = {
    collapsed: false,
    isModalVisible: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  //add category modal
  handleAddCategory = () => {
    // console.log("add category clicked");
    this.setState({ isModalVisible: true });
  };

  //add product modal
  handleAddProduct = () => {
    // console.log("add product clicked");
    this.setState({ isModalVisible: true });
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
    console.log("field", field);
    const addCategory = field.map((item) => item.value);
    // console.log(JSON.stringify(addCategory));
    // console.log("Store category", this.props.category);
    this.props.addCategory(field);
  };
  //finish
  handleOnFinish = (value) => {
    console.log("value", value);
  };

  render() {
    const { collapsed } = this.state;
    return (
      <div>
        <Navbar />
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
            // justifyContent: "space-around",
            // alignContent: "space-around",

            // padding: "10px",
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
                id={10}
                icon={<AppstoreAddOutlined />}
                onClick={this.handleAddCategory}
              >
                Add Category
              </Menu.Item>
              <Menu.Item
                key="2"
                id={11}
                icon={<FileAddOutlined />}
                onClick={this.handleAddProduct}
              >
                Add Product
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
        <Layout>
          <Content>
            <Modal
              title="Add New Category"
              visible={this.state.isModalVisible}
              onOk={(id) => this.handleOk(id)}
              onCancel={this.handleCancel}
            >
              <div>
                <Form
                  name="New category"
                  onFinish={this.handleOnFinish}
                  onFieldsChange={this.handleFieldChange}
                >
                  <Form.Item
                    label="Category Name"
                    name="cat_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input category name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Category Id"
                    name="cat_id"
                    rules={[
                      {
                        required: true,
                        message: "Please input category Id!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </Content>
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
export default connect(mapStateToProps, mapDispatchProps)(Product);
