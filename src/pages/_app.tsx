import "@/styles/globals.css";
import type { AppProps } from "next/app";

//authjs
import { SessionProvider } from "next-auth/react";

//header
import { Header } from "@/Components/Header/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
