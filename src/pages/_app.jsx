import "@fontsource/montserrat";
import "@/styles/globals.css";
import "@/styles/responsive.css";
import "@/styles/Antd.css";
import LayOut from "./_layout";
import { AuthProvider } from "@/context/Auth.context";
import { ConfigProvider } from "antd";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
