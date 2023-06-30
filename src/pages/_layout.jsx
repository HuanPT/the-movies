import React, { useEffect } from "react";
import { useAuthContext } from "@/context/Auth.context";

import { Layout, Space, FloatButton } from "antd";
import Headers from "@/component/Headers";
import Footer from "@/component/Footer";

export default function LayOut({ children }) {
  const { Content } = Layout;
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        background: "#000",
      }}
      size={[0, 48]}
    >
      <Layout style={{ background: "#000", minHeight: "100vh" }}>
        <Headers />
        <Layout id="main__layout">
          <Content>{children}</Content>
        </Layout>
        <Footer />
      </Layout>
      <FloatButton.BackTop />
    </Space>
  );
}
