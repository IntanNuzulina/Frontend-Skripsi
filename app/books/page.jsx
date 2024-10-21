import Card from "@/components/card";
import data from "../dummy";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default async function Page() {
  const products = await axios.get(
    "http://localhost:8000/api/buku/view?latest"
  );
  // const products = data;
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
        <div className="grid grid-cols-6">
          {products.data.data.map((product, index) => (
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

      {/* <figure>
            <img src={props.image} alt="Buku" className="w-full h-[250px]" />
          </figure>
          <div className=" h-[150px] justify-between border-1 border-red-500">
            <h2 className="text-center text-xl font-bold my-3">
              {props.title}
            </h2>
            <p className="my-0 ml-4">{props.publisher}</p>
            <p className="my-0 ml-4"> {props.price}</p>
            <p className="my-0 ml-4"> Stok: {props.stock}</p>
          </div> */}
    </>
  );
}
