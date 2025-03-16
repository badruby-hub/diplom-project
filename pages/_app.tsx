import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PagesWebsite } from "@/components/LinkPages";
import { Toaster } from "react-hot-toast";
import { useStore } from "@nanostores/react";
import { $isOpen } from "@/store/store-data";
import { BurgerMenu } from "@/components/LinkPages";

export default function App({
  Component,
  pageProps: { pageProps } }: AppProps) {
  const
    isOpen = useStore($isOpen)
  return <>
    {isOpen && <BurgerMenu />}
    <PagesWebsite />
    <Component {...pageProps} />
    <Toaster />
  </>
}
