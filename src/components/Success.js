import React from "react";
import Navbar from "./Navbar";
import { Button, Layout, Result } from "antd";
import Footerbar from "./Footer";
import { Content } from "antd/lib/layout/layout";

class Success extends React.Component {
  //handle again buy ..i.e homepage
  handleBuy = () => {
    const { history } = this.props;
    if (history) history.push("/loginhome");
  };
  render() {
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
            <Result
              status="success"
              title="Successfully purchased"
              subTitle={`Order number: ${Math.floor(
                Math.random() * 10000000 + 1
              )}`}
              extra={[
                <Button type="primary" onClick={this.handleBuy} key="buy">
                  Buy Again
                </Button>,
              ]}
            />
          </Content>
        </Layout>
        <Footerbar />
      </div>
    );
  }
}

export default Success;
