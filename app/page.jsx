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
  try {
    responseFlashsale = await fetch(BASE_URL + "/buku/view?flashsale", {
      next: { revalidate: 60 },
      cache: "no-store",
    });

    const responseDataFlashsale = await fetch(BASE_URL + "/flash-sale", {
      next: { revalidate: 60 },
      cache: "no-store",
    });
    const dataFlashsale = await responseFlashsale.json();
    productFlashsales = dataFlashsale.data;
    const flashsaleJson = await responseDataFlashsale.json();
    flashsale = flashsaleJson;
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Navbar />
      <Header />
      {new Date(flashsale?.data[0]?.tanggal_akhir) >= new Date() && (
        <Flashsale flashsale={flashsale} products={productFlashsales} />
      )}
      <Category />
      <Products />
      <Footer />
    </>
  );
}
