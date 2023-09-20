import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { Providers } from "../components/layout-part/providers";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps | any) {
  return (
    <CookiesProvider>
      <NextNProgress />
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </CookiesProvider>
  );
}

export default App;
