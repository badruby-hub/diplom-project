import Head from "next/head";
import { JsphMain } from "../components/jsph/JSPH-table";
import { BurgerMenu } from "../components/LinkPages/index";







export default function Home() {
  return <div className="home">
    <Head>
      <title>интернет-магазин:WILDBERRIS</title>
    </Head>
    <JsphMain />
  </div>
}
