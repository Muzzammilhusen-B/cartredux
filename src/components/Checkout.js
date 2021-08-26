import {
  Layout,
  Collapse,
  Modal,
  Form,
  Input,
  // Space,
  Row,
  Col,
  Button,
  DatePicker,
  Image,
  Card,
  Popconfirm,
  // InputNumber,
} from "antd";
import {
  PlusCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import React from "react";
import Footerbar from "./Footer";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { checkout } from "../actions";

const { Panel } = Collapse;
const { Content } = Layout;
const { TextArea } = Input;
class Checkout extends React.Component {
  state = {
    fullname: "",
    pincode: null,
    address: "",
    landmark: "",
    country: "",
    phone: null,
    isDelModalvisible: false,
    isShipModalvisible: false,
    isPayModalvisible: false,
    checkboxState: [],
    details: [],
  };
  //   useEffect(() => {
  //     handleOnChange();
  //   });
  //for delivery modal
  componentDidMount() {
    // const details = JSON.parse(localStorage.getItem("deliveryState"));
    // console.log("mounted details", details);
    // this.setState({ details: details });
    if (this.props.count === 0) {
      const details = [];
      this.setState({ details: details });
      const { history } = this.props;
      if (history) history.push("/loginhome");
      // localStorage.setItem("deliveryState", JSON.parse(details));
    }
  }
  handleDeliveyAdd = () => {
    console.log("clicked");
    this.setState({ isDelModalvisible: true });
  };
  handleOk = () => {
    const { fullname, Address, Landmark, phone, country, pincode } = this.state;

    this.setState({
      isPayModalvisible: false,
      fullname: fullname,
      Address: Address,
      pincode: pincode,
      Landmark: Landmark,
      phone: phone,
      country: country,
    });
    console.log("delivey detail", this.state);
    localStorage.setItem("deliveryState", JSON.stringify(this.state));
    this.setState({ isDelModalvisible: false });
  };
  handleCancel = () => {
    this.setState({ isDelModalvisible: false });
  };
  //for shipping address
  handleShippingAdd = () => {
    this.setState({ isShipModalvisible: true });
  };
  handleShipOk = () => {
    this.setState({ isShipModalvisible: false });
  };
  handleShipCancel = () => {
    this.setState({ isShipModalvisible: false });
  };
  //for payment details
  handlePaymentDetails = () => {
    this.setState({ isPayModalvisible: true });
  };
  handlePayOk = () => {};
  handlePayCancel = () => {
    this.setState({ isPayModalvisible: false });
  };
  //onchange
  handleOnChange = (e) => {
    // console.log("value", e.target.value);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  //checkout process
  handleCheckout = () => {
    this.props.checkout();
    const { history } = this.props;
    if (history) history.push("/successpage");
  };
  render() {
    const addedItems = this.props.addedItems;
    console.log("checkout addeditems", addedItems);
    const total = this.props.total;
    console.log("checkout total", total);
    const count = this.props.count;
    console.log("checkout count", count);

    const {
      details,
      isDelModalvisible,
      //   isPayModalvisible,
      //   isShipModalvisible,
      fullname,
      address,
      landmark,
      pincode,
      country,
      phone,
    } = this.state;
    console.log("checkout details", details);

    return (
      <div>
        <Navbar />
        <Layout
          style={{
            height: "94vh",
            // alignItems: "center",
            padding: "10px",
            background:
              "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
            filter:
              "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
          }}
        >
          <Content style={{ padding: "20px", marginTop: "50px" }}>
            <div>
              <Row>
                <Col span={10}>
                  <div>
                    <h1>Details</h1>
                  </div>
                  <div>
                    <Collapse>
                      <Panel header="Delivry Address" key="1">
                        <PlusCircleOutlined
                          style={{ fontSize: "20px" }}
                          onClick={this.handleDeliveyAdd}
                        />
                        {fullname &&
                        address &&
                        pincode &&
                        phone &&
                        landmark &&
                        country === "" ? null : (
                          <ul>
                            <p>Name: {fullname}</p>
                            <p>Pincode: {pincode}</p>
                            <p>Address: {address}</p>
                            <p>Landmark: {landmark}</p>
                            <p>
                              Country: <strong>{country}</strong>(Service
                              available only in india)
                            </p>
                            <p>Phone: {phone}</p>
                          </ul>
                        )}
                        <Modal
                          visible={isDelModalvisible}
                          title="Add Delivery Address"
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                        >
                          <Form>
                            <Form.Item
                              label="Full Name"
                              name="fullname"
                              value={fullname}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Full name!",
                                },
                              ]}
                            >
                              <Input
                                name="fullname"
                                type="text"
                                onChange={this.handleOnChange}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Pincode"
                              //   name="pincode"
                              value={pincode}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input pincode",
                                },
                              ]}
                            >
                              <Input
                                maxLength={6}
                                name="pincode"
                                type="number"
                                onChange={this.handleOnChange}
                              />
                            </Form.Item>{" "}
                            <Form.Item
                              label="Address"
                              //   name="address"
                              value={address}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Address!",
                                },
                              ]}
                            >
                              <TextArea
                                name="address"
                                type="text"
                                onChange={this.handleOnChange}
                              />
                            </Form.Item>{" "}
                            <Form.Item
                              label="Landmark"
                              //   name="landmark"
                              value={landmark}
                            >
                              <Input
                                placeholder="(Optional)"
                                name="landmark"
                                type="text"
                                onChange={this.handleOnChange}
                              />
                            </Form.Item>{" "}
                            <Form.Item
                              label="Country"
                              //   name="country"
                              value={country}
                            >
                              <strong>India</strong>(Service availble only in
                              india)
                            </Form.Item>{" "}
                            <Form.Item
                              label="Phone"
                              //   name="phone"
                              value={phone}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input phone number!",
                                },
                              ]}
                            >
                              <Input
                                addonBefore="+91"
                                name="phone"
                                type="number"
                                onChange={this.handleOnChange}
                              />
                            </Form.Item>
                          </Form>
                        </Modal>
                      </Panel>
                      {/* <Panel header="Shipping Address" key="2">
                    <Space>
                      <PlusCircleOutlined
                        style={{ fontSize: "20px" }}
                        onClick={this.handleShippingAdd}
                      />
                      <Checkbox onChange={this.handleCheckbox}>
                        Same as Delivey address
                      </Checkbox>
                    </Space>
                    <Modal
                      visible={isShipModalvisible}
                      title="Add Shipping Address"
                      onOk={this.handleShipOk}
                      onCancel={this.handleShipCancel}
                    ></Modal>
                  </Panel> */}
                      <Panel header="Payment Details" key="3">
                        <Card>
                          <Row>
                            <Col span={24}>
                              Name On Card
                              <Input
                                onChange={this.handleCardNumber}
                                required
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              Card Number
                              <Input
                                maxLength={16}
                                onChange={this.handleCardNumber}
                                required
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={6}>
                              Month
                              <DatePicker picker="month" />
                            </Col>
                            <Col span={6} offset={2}>
                              Year
                              <DatePicker picker="year" />
                            </Col>
                            <Col offset={4} span={6}>
                              CVV
                              <Input.Password
                                maxLength={3}
                                placeholder="Input cvv"
                                iconRender={(visible) =>
                                  visible ? (
                                    <EyeTwoTone />
                                  ) : (
                                    <EyeInvisibleOutlined />
                                  )
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <Popconfirm
                                title="Delivry and Card details are ok?"
                                onConfirm={this.handleCheckout}
                              >
                                <Button
                                  type="primary"
                                  style={{ marginTop: "10px", width: "100%" }}
                                >
                                  Pay and Checkout
                                </Button>
                              </Popconfirm>
                            </Col>
                          </Row>
                        </Card>
                        {/* <PlusCircleOutlined
                      style={{ fontSize: "20px" }}
                      onClick={this.handlePaymentDetails}
                    />
                    <Modal
                      visible={isPayModalvisible}
                      title="Add Payment Details"
                      onOk={this.handlePayOk}
                      onCancel={this.handlePayCancel}
                    ></Modal> */}
                      </Panel>
                    </Collapse>
                  </div>
                </Col>
                <Col span={12} offset={2}>
                  <div>
                    <div>
                      <h1>CheckOut Summary</h1>
                    </div>
                    <div>
                      <ul>
                        {addedItems.map((item) => {
                          return (
                            <div key={item.id}>
                              <Row>
                                <Col span={6}>
                                  <Image
                                    src={item.image}
                                    style={{ width: "100px" }}
                                  />
                                </Col>
                                <Col span={4}>{item.name}</Col>
                                <Col span={6}>Price: {item.price}</Col>

                                <Col span={8}>Quantity: {item.quantity}</Col>
                              </Row>
                            </div>
                          );
                        })}

                        <div style={{ fontSize: "20px" }}>
                          <strong>Total: {total}</strong>
                          <Card title={fullname}>
                            <p>{pincode}</p>
                            <p>{address}</p>
                            <p>{landmark}</p>
                            <p>{country}</p>
                            <p>{phone}</p>
                          </Card>
                        </div>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
        <Footerbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    total: state.total,
    addedItems: state.addedItems,
  };
};
const mapStateToDispatch = (dispatch) => {
  return {
    checkout: () => {
      dispatch(checkout());
    },
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(Checkout);
