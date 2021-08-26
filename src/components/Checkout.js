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
  Space,
  // InputNumber,
} from "antd";
import {
  PlusCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CreditCardOutlined,
  PhoneTwoTone,
  UserOutlined,
  HomeTwoTone,
  PushpinTwoTone,
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
    country: "India",
    phone: null,
    isDelModalvisible: false,
    isShipModalvisible: false,
    isPayModalvisible: false,
    checkboxState: [],
    details: [],
    nameoncard: "",
    cardnumber: "",
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
  //handle card
  handleCardNumber = (e) => {
    const { value } = e.target;
    this.setState({
      // nameoncard: value,
      cardnumber: value,
    });
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
      nameoncard,
      cardnumber,
    } = this.state;
    console.log("checkout details", details);

    return (
      <div>
        <Navbar />
        <Layout
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
                              name="pincode"
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
                                onChange={this.handleOnChange}
                              />
                            </Form.Item>{" "}
                            <Form.Item
                              label="Address"
                              name="address"
                              value={address}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Address!",
                                },
                              ]}
                            >
                              <TextArea
                                type="text"
                                name="address"
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
                              // name="country"
                              value={country}
                            >
                              <strong>India</strong>(Service availble only in
                              india)
                            </Form.Item>{" "}
                            <Form.Item
                              label="Phone"
                              name="phone"
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
                                maxLength={10}
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
                          <Form layout="vertical">
                            <Row>
                              <Col span={24}>
                                <Form.Item
                                  label="Name On Card"
                                  name="nameoncard"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input name as on card!",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    value={nameoncard}
                                    // onChange={this.handleCardNumber}
                                    placeholder="Name on card"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <Form.Item
                                  label="Card Number"
                                  name="cardnumber"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input number as on card!",
                                    },
                                  ]}
                                >
                                  <Input
                                    maxLength={16}
                                    onChange={this.handleCardNumber}
                                    value={cardnumber}
                                    placeholder="4354 3435 2344 3454"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={6}>
                                <Form.Item
                                  label="Month"
                                  name="month"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select month!",
                                    },
                                  ]}
                                >
                                  <DatePicker picker="month" />
                                </Form.Item>
                              </Col>
                              <Col span={6} offset={2}>
                                <Form.Item
                                  label="Year"
                                  name="year"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select Year!",
                                    },
                                  ]}
                                >
                                  <DatePicker picker="year" />
                                </Form.Item>
                              </Col>
                              <Col offset={4} span={6}>
                                <Form.Item
                                  label="CVV"
                                  name="cvv"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input cvv number as on behind card!",
                                    },
                                  ]}
                                >
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
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <Popconfirm
                                  title="Delivry and Card details are ok?"
                                  onConfirm={this.handleCheckout}
                                >
                                  <Button
                                    icon={
                                      <CreditCardOutlined
                                        style={{ fontSize: "20px" }}
                                      />
                                    }
                                    disabled={cardnumber === "" ? true : ""}
                                    type="primary"
                                    style={{ marginTop: "10px", width: "100%" }}
                                  >
                                    Pay ₹. {total}
                                  </Button>
                                </Popconfirm>
                              </Col>
                            </Row>
                          </Form>
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
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                </Col>
                                <Col span={4}>{item.name}</Col>
                                <Col span={6}>Price: ₹. {item.price}</Col>

                                <Col span={8}>Quantity: {item.quantity}</Col>
                              </Row>
                            </div>
                          );
                        })}
                        <strong style={{ fontSize: "20px" }}>
                          To Pay: ₹. {total}
                        </strong>

                        {fullname === "" ? (
                          ""
                        ) : (
                          <div style={{ fontSize: "20px" }}>
                            <Card title={fullname} extra={<UserOutlined />}>
                              <div>
                                <Space>
                                  <HomeTwoTone />
                                  {address}-{pincode}
                                </Space>
                              </div>
                              <div>
                                <Space>
                                  <PushpinTwoTone />
                                  {landmark}
                                </Space>
                              </div>
                              <div>
                                <strong>{country}</strong>(Service available
                                only in india)
                              </div>
                              <div>
                                <Space>
                                  {" "}
                                  <PhoneTwoTone />
                                  {phone}
                                </Space>
                              </div>
                            </Card>
                          </div>
                        )}
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