import Card from "@/components/card";
import Title from "@/components/title";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import CountDown from "@/components/countDown";
import Link from "next/link";
import { BASE_URL } from "@/utils/config";

export default async function Flashsale({ flashsale, products }) {
  return (
    <div className="mt-10 mx-8 border-b-2">
      <div className="flex gap-2 mt-3">
        <Title name={"Flashsale"} sub={"Today's"} />
        <CountDown flashsale={flashsale} />
      </div>

      <div className="flex  mt-3">
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2">
          {products.map((product, index) => (
            <div key={index}>
              {product.flashsale.tanggal_akhir !== "0000-00-00 00:00:00" && (
                <>
                  {index < 6 && (
                    <>
                      <Link href={`/books/detail/${product.id}`}>
                        <Card
                          image={product.image}
                          title={product.judul}
                          publisher={product.penerbit}
                          price={product.harga}
                          stock={product.stok}
                          diskon={product?.flashsale?.diskon}
                          button={"Beli Sekarang"}
                        />
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="btn  bg-red-500 hover:bg-red-600 text-white block mx-auto my-3">
        <Link href="/flashsales">
          Lihat Semua <MdKeyboardDoubleArrowRight className="text-lg inline" />
        </Link>{" "}
      </button>
    </div>
  );
}
