import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { HeartFilled } from "@ant-design/icons";

const { Footer } = Layout;
const Footerbar = () => {
  return (
    <Layout>
      <Footer
        style={{
          textAlign: "center",
          // alignContent: "end"
          clear: "both",
          // marginTop: "20px",
          position: "relative",
          bottom: "0",
          width: "100%",
          height: "20px",
        }}
      >
        <HeartFilled />
        Shooping Cart App Design ©2021.
      </Footer>
    </Layout>
  );
};

export default Footerbar;
