"use client";

import { SwalTopEnd } from "@/components/MySwal";
import { CartContext } from "@/context/cartContext";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { IoBagCheck } from "react-icons/io5";
import PurchaseDetailsPanel from "./purchaseDetailPanel";

export default function DetailProduct({ products }) {
  const [bukuId, setBukuId] = useState(products.id);
  const [qty, setQty] = useState(1);
  const [harga, setHarga] = useState(products.harga);
  const [showPanel, setShowPanel] = useState(false);

  const { cartCount, setCartCount } = useContext(CartContext);
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/keranjang/create",
        {
          buku_id: bukuId,
          qty,
          harga: Number(harga),
          total_harga: Number(harga) * qty,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
          },
        }
      );

      setCartCount(response.data.jumlah_keranjang);
      SwalTopEnd({
        title: "Berhasil",
        text: response.data.message,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = "SB-Mid-client-KQ1-ErHt-ihsWFo1";
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <div className="flex flex-col justify-center lg:flex-row gap-6 lg:gap-9">
      <div className="shadow-lg mt-6  ml-3 lg:ml-5 rounded-3xl lg:mb-12 mx-5">
        <div className="w-full lg:w-[700px] p-5 grid md:grid-cols-[250px_minmax(900px,_1fr)] grid-cols-1">
          <Image
            src={"http://localhost:8000/storage/" + products.gambar}
            alt="Buku"
            width={200}
            height={100}
            className="mx-auto mt-5 mb-5 rounded-2xl justify-center items-center order-1 lg:my-auto lg:mx-auto"
          />

          <div className=" ml-8 w-full lg:w-[400px] order-3 mb-3 mt-3">
            <h2 className="mt-4 font-bold text-xl mb-1">Detail Buku</h2>
            <p className="border-b-2 w-[200px] mb-2"></p>
            <div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-[130px]">Jumlah Halaman</td>
                    <td className="px-1">:</td>
                    <td>{products.halaman}</td>
                  </tr>
                  <tr>
                    <td className="w-[130px]">Penerbit</td>
                    <td className="px-1">:</td>
                    <td>{products.penerbit}</td>
                  </tr>
                  <tr>
                    <td className="w-[130px]">Tahun Terbit</td>
                    <td className="px-1">:</td>
                    <td>{products.thn_terbit}</td>
                  </tr>
                  <tr>
                    <td className="w-[130px]">ISBN</td>
                    <td className="px-1">:</td>
                    <td>{products.isbn}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full lg:w-[400px] px-5 order-2">
            <h1 className="text-3xl font-bold mt-1 mx-3 text-blue-900">
              {products.judul}
            </h1>
            <div className="mt-3">
              <h5 className="ml-3 font-semibold mb-3 text-gray-600 text-xl">
                Deskripsi Buku
              </h5>
              <p className="border-b-2"></p>
              <p className="text-justify mx-3 mt-1 text-base">
                {products.deskripsi}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 lg:mt-6 lg:pt-5  mx-5 mb-5">
        <div className="shadow p-5 rounded-2xl bg-slate-100 ">
          <h2 className="font-bold text-md mb-1 text-center">Harga Buku</h2>
          <div className="border-b-2 border-x-slate-600 mb-3"></div>
          <div className="flex justify-between">
            <div className="text-center">
              <h4 className="font-semibold mx-auto">
                {" "}
                Harga <span className="font-bold">Rp. {products.harga}</span>
              </h4>
            </div>
            <div>
              <h4></h4>
            </div>
          </div>

          <div className="mt-6 w-full lg:w-[300px] mb-3">
            <div className="flex gap-3">
              <a
                onClick={handleAddToCart}
                className="lg:h-10 lg:w-40 text-sm rounded-3xl h-10 w-1/2 bg-white border-black border-2 hover:bg-blue-900 hover:text-white flex justify-center items-center"
              >
                <HiShoppingCart className="text-lg me-1" />
                Keranjang
              </a>
              <button
                onClick={() => setShowPanel(true)}
                className="lg:h-10 lg:w-40 text-sm rounded-3xl w-1/2 h-10 bg-blue-900 border-2 border-gray-950 text-white hover:bg-blue-950 flex justify-center items-center"
              >
                <IoBagCheck className="text-lg text-white me-1" />
                Beli
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* {showPanel && ( */}
      <PurchaseDetailsPanel
        showPanel={showPanel}
        products={products}
        onClose={() => setShowPanel(false)}
      />
      {/* )} */}
    </div>
  );
}
