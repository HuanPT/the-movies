import "@fontsource/montserrat";
import "@/styles/globals.css";
import "@/styles/responsive.css";
import LayOut from "./_layout";
import { AuthProvider } from "@/context/Auth.context";
import { ConfigProvider } from "antd";

import { Provider } from "react-redux";
// import { store } from "@/stores/store";

export default function App({ Component, pageProps }) {
  return (
    // <Provider store={store}>
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
    // </Provider>
  );
}
