import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/Auth.context";
import { cost, getOverview, numberWithCommas } from "@/lib/common";

import { Layout, Space, FloatButton } from "antd";
import Headers from "@/component/Headers";
import Footer from "@/component/Footer";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUserContext } from "@/context/User.context";

export default function LayOut({ children }) {
  const { Content } = Layout;
  const { user, userData } = useAuthContext();
  // const { userData } = useUserContext();


  console.log("user: ", user, "userData: ", userData);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (user) {
  //     const userRef = collection(db, "users");
  //     const docRef = doc(userRef, user.uid);
  //     getDoc(docRef)
  //       .then((doc) => doc.data())
  //       .then((data) => {
  //         console.log(data);
  //         return setData(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [user]);

  // console.log(data);
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        background: "#000",
      }}
      size={[0, 48]}
    >
      <Layout style={{ background: "#000" }}>
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
