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
      <div className="mt-6 mx-8 border-b-2 pb-8">
        <div className="flex items-center justify-center my-4">
          <hr className="w-1/3 border-t-2 border-blue-900" />
          <p className="mx-4 text-center text-blue-900 font-semibold text-lg md:text-xl lg:text-xl">
            Semua Buku
          </p>
          <hr className="w-1/3 border-t-2 border-blue-900" />
        </div>
        <div className="lg:mx-auto lg:w-[90%]">
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2">
            {products.data.map((product, index) => (
              <>
                <Link href={`/books/detail/${product.id}`}>
                  <Card product={product} button={"Lihat Detail"} />
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
