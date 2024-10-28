import Card from "@/components/card";
import Navbar from "@/components/navbar";
import { BASE_URL } from "@/utils/config";

export default async function Page() {
  const productsFlashsale = await fetch(BASE_URL + "/buku/view");

  const datas = await productsFlashsale.json();
  const products = await datas.data;

  return (
    <>
      <Navbar />
      <div className="mt-8 mx-8 border-b-2">
        <div className="flex  mt-3">
          {products.map((product, index) => (
            <div key={index}>
              {product?.flashsale?.tanggal_akhir !== "0000-00-00 00:00:00" && (
                <>
                  <Card product={product} button={"Beli Sekarang"} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
