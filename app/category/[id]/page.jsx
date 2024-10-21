import Card from "@/components/card";
import Navbar from "@/components/navbar";
import axios from "axios";
import Link from "next/link";

export default async function KategoriPage({ params }) {
  const data = await fetch(
    "http://localhost:8000/api/kategori/view/" + params.id,
    { cache: "no-store" }
  );
  const products = await data.json();

  return (
    <>
      <Navbar />
      <div className="mx-auto my-8 w-[90%]">
        <h2 className="text-xl font-bold  text-blue-900 ms-2 mb-2">
          Halaman Detail Kategori : {products?.data[0]?.kategori.kategori}
        </h2>
        <div className="grid grid-cols-6 ">
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
