import "@fontsource/montserrat";
import "@/styles/globals.css";
import "@/styles/responsive.css";
import LayOut from "./_layout";
import { AuthProvider } from "@/context/Auth.context";
// import { UserProvider } from "@/context/User.context";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* <UserProvider> */}
      <LayOut>
        <Component {...pageProps} />
      </LayOut>
      {/* </UserProvider> */}
    </AuthProvider>
  );
}
