import "../styles/globals.css";
import "swiper/swiper.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import type { AppProps } from "next/app";
import { UserContextComp } from "../context/userContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextComp>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </UserContextComp>
  );
}
export default MyApp;
