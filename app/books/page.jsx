import Card from "@/components/card";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { BASE_URL } from "@/utils/config";

export default async function Page() {
  const res = await fetch(BASE_URL + "/buku/view?latest", {
    next: { revalidate: 0 },
  });
  const resJson = await res.json();
  const products = resJson;
  return (
    <>
      <Navbar />
      <label className="input input-bordered flex  items-center gap-2 w-1/3 my-5 m-auto  ">
        <input type="text" className="grow" placeholder="Cari Buku..." />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="mx-auto w-[90%]">
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
