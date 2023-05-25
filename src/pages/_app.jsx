import "@fontsource/montserrat";
import "@/styles/globals.css";
import "@/styles/responsive.css";
import LayOut from "./_layout";
import { AuthProvider } from "@/context/Auth.context";
import { ConfigProvider } from "antd";
// import { UserProvider } from "@/context/User.context";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* <UserProvider> */}
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "'montserrat', sans-serif",
          },
        }}
      >
        <LayOut>
          <Component {...pageProps} />
        </LayOut>
      </ConfigProvider>
      {/* </UserProvider> */}
    </AuthProvider>
  );
}
