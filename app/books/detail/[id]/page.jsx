import Navbar from "@/components/navbar";
import axios from "axios";
import DetailProduct from "./detail";

async function fetchProduct(id) {
  const response = await axios.get(`http://localhost:8000/api/buku/view/${id}`);
  return response.data.data;
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
