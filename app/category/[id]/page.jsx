import Card from "@/components/card";
import Navbar from "@/components/navbar";
import { BASE_URL } from "@/utils/config";
import Link from "next/link";

export default async function KategoriPage({ params }) {
  const res = await fetch(BASE_URL + "/kategori/view/" + params.id, {
    next: { revalidate: 0 },
  });
  const resJson = await res.json();
  const products = resJson;

  return (
    <>
      <Navbar />
      <div className="mx-auto my-8 w-[90%]">
        <h2 className="text-xl font-bold  text-blue-900 ms-2 mb-2">
          Halaman Detail Kategori : {products?.data[0]?.kategori.kategori}
        </h2>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2">
          {products.data.map((product, index) => (
            <>
              <Link href={`/books/detail/${product.id}`}>
                <Card
                  key={index}
                  image={product.image}
                  title={product.judul}
                  publisher={product.penerbit}
                  price={product.harga}
                  stock={product.stok}
                  button={"Lihat Detail"}
                />
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
