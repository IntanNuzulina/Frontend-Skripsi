import Card from "@/components/card";
import Title from "@/components/title";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import data from "./dummy";
import axios from "axios";
import Link from "next/link";

export default async function Products() {
  // const products = data;
  const products = await axios.get(
    "http://localhost:8000/api/buku/view?latest"
  );
  return (
    <div className="mt-10 mx-8">
      <Title name={"Our Books"} sub={"Our Products"} />
      <div className="flex mt-3">
        {products.data.data.map((product, index) => (
          <>
            {index < 6 && (
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
            )}
          </>
        ))}
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
