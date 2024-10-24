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

  return (
    <>
      <Navbar />
      <Header />
      <Flashsale />
      <Category />
      <Products />
      <Footer />
    </>
  );
}
