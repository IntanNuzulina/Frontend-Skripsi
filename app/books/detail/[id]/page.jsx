import Navbar from "@/components/navbar";
import DetailProduct from "./detail";
import { BASE_URL } from "@/utils/config";

async function fetchProduct(id) {
  const response = await fetch(`${BASE_URL}/buku/view/${id}`, {
    next: { revalidate: 60 },
  });
  const resJson = await response.json();
  return resJson.data;
}

export default async function Page({ params }) {
  const { id } = params;
  const products = await fetchProduct(id);
  return (
    <>
      <Navbar />
      <DetailProduct products={products} />
    </>
  );
}
