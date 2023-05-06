import React from "react";
import { Tabs } from "antd";

import styles from "@/styles/TabsRight.module.css";

export default function TabsRight({ items }) {
  return (
    <Tabs
      className={styles.tabs}
      type="card"
      centered
      tabBarGutter={10}
      defaultActiveKey="1"
      items={items}
      size="large"
    />
  );
}
