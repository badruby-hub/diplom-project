import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PagesWebsite } from "@/components/LinkPages";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }: AppProps) {
  return <>
  <PagesWebsite/>
  <Component {...pageProps} />
  <Toaster/>
  </>
}
