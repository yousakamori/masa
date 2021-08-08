import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContextComp } from "../context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextComp>
      <Component {...pageProps} />
    </UserContextComp>
  );
}
export default MyApp;
