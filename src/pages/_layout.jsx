import React, { useEffect } from "react";
import { useAuthContext } from "@/context/Auth.context";

import { Layout, Space, FloatButton } from "antd";
import Headers from "@/component/Headers";
import Footer from "@/component/Footer";

import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut, selectUser } from "@/stores/user.slice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LayOut({ children }) {
  const { Content } = Layout;

  // const user = useSelector(selectUser);
  // const dispatch = useDispatch();

  // check at page load if a user is authenticated
  // useEffect(() => {
  //   onAuthStateChanged(auth, (userAuth) => {
  //     if (userAuth) {
  //       // user is logged in, send the user's details to redux, store the current user in the state
  //       dispatch(
  //         signIn({
  //           email: userAuth.email,
  //           uid: userAuth.uid,
  //           displayName: userAuth.displayName,
  //           photoUrl: userAuth.photoURL,
  //         })
  //       );
  //     } else {
  //       dispatch(signOut());
  //     }
  //   });
  // }, []);

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
