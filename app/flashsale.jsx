import Card from "@/components/card";
import Title from "@/components/title";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import CountDown from "@/components/countDown";
import Link from "next/link";
import { BASE_URL } from "@/utils/config";

export default async function Flashsale({ flashsale }) {
  const productsFlashsale = await fetch(BASE_URL + "/buku/view", {
    next: { revalidate: 60 },
  });
  const productsFlashsaleJson = await productsFlashsale.json();

  const products = productsFlashsaleJson.data;

  return (
    <div className="mt-10 mx-8 border-b-2">
      <div className="flex gap-2 mt-3">
        <Title name={"Flashsale"} sub={"Today's"} />
        <CountDown flashsale={flashsale} />
      </div>

      <div className="flex  mt-3">
        {products.map((product, index) => (
          <div key={index}>
            {product.flashsale.tanggal_akhir !== "0000-00-00 00:00:00" && (
              <>
                {index < 6 && (
                  <Card
                    image={product.image}
                    title={product.judul}
                    publisher={product.penerbit}
                    price={product.harga}
                    stock={product.stok}
                    button={"Beli Sekarang"}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <button className="btn  bg-red-500 hover:bg-red-600 text-white block mx-auto my-3">
        <Link href="/flashsales">
          Lihat Semua <MdKeyboardDoubleArrowRight className="text-lg inline" />
        </Link>{" "}
      </button>
    </div>
  );
}
