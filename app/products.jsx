import Card from "@/components/card";
import Title from "@/components/title";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import { BASE_URL } from "@/utils/config";

export default async function Products() {
  const res = await fetch(BASE_URL + "/buku/view?latest", {
    next: { revalidate: 0 },
  });
  const resJson = await res.json();
  let products = null;
  products = resJson.data;
  return (
    <div className="mt-10 mx-8">
      <Title name={"Our Books"} sub={"Our Products"} />
      <div className="flex mt-3">
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2">
          {products.map((product, index) => (
            <>
              {index < 6 && (
                <>
                  <Link href={`/books/detail/${product.id}`}>
                    <Card
                      key={index}
                      product={product}
                      button={"Lihat Detail"}
                    />
                  </Link>
                </>
              )}
            </>
          ))}
        </div>
      </div>
      <button className="btn  bg-red-500 hover:bg-red-600 text-white block mx-auto my-3">
        {" "}
        <Link href="/books">
          Lihat Semua <MdKeyboardDoubleArrowRight className="text-lg inline" />
        </Link>
      </button>
    </div>
  );
}
