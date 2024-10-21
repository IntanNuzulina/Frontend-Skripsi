import Navbar from "@/components/navbar";
import Image from "next/image";
import Header from "./header";
import Flashsale from "./flashsale";
import Category from "./category";
import Products from "./products";
import Footer from "@/components/footer";
import axios from "axios";

export default async function Page() {
  let responseFlashsale = null;
  let flashsale = null;
  let productFlashsales = null;
  let countFlashsaleProducts = null;
  try {
    responseFlashsale = await axios.get("http://localhost:8000/api/buku/view");

    flashsale = await axios.get("http://localhost:8000/api/flash-sale/view");
    productFlashsales = responseFlashsale.data.data;
    countFlashsaleProducts = 0;
    productFlashsales.forEach((product) => {
      if (product.flashsale.tanggal_akhir !== "0000-00-00 00:00:00")
        countFlashsaleProducts++;
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Navbar />
      <Header />
      {countFlashsaleProducts > 0 && (
        <Flashsale flashsale={flashsale.data.data[0].tanggal_akhir} />
      )}
      <Category />
      <Products />
      <Footer />
    </>
  );
}
