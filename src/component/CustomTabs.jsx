import React from "react";
import { Tabs } from "antd";

export default function CustomTabs({ items }) {
  return (
    <Tabs
      type="card"
      centered
      tabBarGutter={10}
      defaultActiveKey="1"
      items={items}
      size="large"
    />
  );
}
