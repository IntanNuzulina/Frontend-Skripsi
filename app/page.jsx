import Navbar from "@/components/navbar";
import Header from "./header";
import Flashsale from "./flashsale";
import Category from "./category";
import Products from "./products";
import Footer from "@/components/footer";
import { BASE_URL } from "@/utils/config";

export default async function Page() {
  let responseFlashsale = null;
  let flashsale = null;
  let productFlashsales = null;
  let countFlashsaleProducts = null;
  try {
    responseFlashsale = await fetch(BASE_URL + "/buku/view", {
      next: { revalidate: 60 },
    });

    const responseDataFlashsale = await fetch(BASE_URL + "/flash-sale/view", {
      next: { revalidate: 60 },
    });
    const dataFlashsale = await responseFlashsale.json();
    productFlashsales = dataFlashsale.data;
    const flashsaleJson = await responseDataFlashsale.json();
    flashsale = flashsaleJson.data;
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
        <Flashsale flashsale={flashsale[0].tanggal_akhir} />
      )}
      <Category />
      <Products />
      <Footer />
    </>
  );
}
