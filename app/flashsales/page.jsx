import Card from "@/components/card";
import axios from "axios";
import Navbar from "@/components/navbar";

export default async function Flashsale({ flashsale }) {
  const productsFlashsale = await axios.get(
    "http://localhost:8000/api/buku/view"
  );

  const products = productsFlashsale.data.data;

  return (
    <>
      <Navbar />
      <div className="mt-8 mx-8 border-b-2">
        <div className="flex  mt-3">
          {products.map((product, index) => (
            <div key={index}>
              {product.flashsale.tanggal_akhir !== "0000-00-00 00:00:00" && (
                <>
                  <Card
                    image={product.image}
                    title={product.judul}
                    publisher={product.penerbit}
                    price={product.harga}
                    stock={product.stok}
                    button={"Beli Sekarang"}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
