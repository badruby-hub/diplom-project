import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PagesWebsite } from "@/components/LinkPages";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps:{session, pageProps}}: AppProps) {
  return (
  <SessionProvider session={session}>
     <PagesWebsite/>
     <Component {...pageProps} />
     <Toaster/>
  </SessionProvider>

  )
}
