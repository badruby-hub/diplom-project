import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PagesWebsite } from "@/components/LinkPages";
import { JSPHTable } from "@/components/jsph/JSPH-table";

import { Toaster } from "react-hot-toast";
import { useState } from "react";
export default function App({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState("");
  return <>
   <PagesWebsite handleSearchChange={setSearch} onSearch={setSearch} />
   <JSPHTable search={search} />
  <Component {...pageProps} />
  <Toaster/>
  </>
}
