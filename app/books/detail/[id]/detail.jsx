"use client";

import { SwalTopEnd } from "@/components/MySwal";
import { CartContext } from "@/context/cartContext";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { IoBagCheck } from "react-icons/io5";
import PurchaseDetailsPanel from "./purchaseDetailPanel";
import { BASE_URL, IMAGE_URL } from "@/utils/config";
import { BiSolidTag } from "react-icons/bi";

export default function DetailProduct({ products }) {
  const [bukuId, setBukuId] = useState(products.id);
  const [qty, setQty] = useState(1);
  const [harga, setHarga] = useState(products.harga);
  const [showPanel, setShowPanel] = useState(false);

  const { cartCount, setCartCount } = useContext(CartContext);
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/keranjang/create",
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

    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Jika ingin tanpa desimal
    }).format(number);
  };
  return (
    <div className="flex flex-col justify-center lg:flex-row gap-6 lg:gap-9">
      <div className="shadow-lg mt-6  ml-3 lg:ml-5 rounded-3xl lg:mb-12 mx-5">
        <div className="w-full lg:w-[700px] p-5 grid md:grid-cols-[250px_minmax(900px,_1fr)] grid-cols-1">
          <Image
            src={IMAGE_URL + "/" + products.image}
            alt="Buku"
            width={200}
            height={100}
            className="mx-auto mt-5 mb-5 rounded-2xl justify-center items-center order-1 lg:my-auto lg:mx-auto"
          />

          <div className=" ml-8 w-full lg:w-[400px] order-3 mb-3 mt-3">
            <h2 className="mt-4 font-bold text-xl mb-1">Detail Buku</h2>
            <p className="border-b-2 w-[200px] mb-2"></p>
            <div>
              <table style={{ width: "800px" }}>
                <tbody>
                  <tr>
                    <td className="w-[130px]"> Pengarang</td>
                    <td className="px-1">:</td>
                    <td>{products.penulis}</td>
                  </tr>
                  <tr>
                    <td className="w-[130px]">Penerbit</td>
                    <td className="px-1">:</td>
                    <td>{products.penerbit}</td>
                  </tr>
                  <tr>
                    <td className="w-[130px]">ISBN</td>
                    <td className="px-1">:</td>
                    <td>{products.isbn}</td>
                  </tr>
                  <tr>
                    <td className="w-[130px]">Tahun Terbit</td>
                    <td className="px-1">:</td>
                    <td>{products.thn_terbit}</td>
                  </tr>
                  <tr>
                    <td className="w-[130px]">Jumlah Halaman</td>
                    <td className="px-1">:</td>
                    <td>{products.halaman} Lembar</td>
                  </tr>
                  <tr>
                    <td className="w-[130px]">Kategori</td>
                    <td className="px-1">:</td>
                    <td>{products.kategori.kategori}</td>
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
          <div className="font-semibold">
            {new Date(products?.flashsale?.tanggal_akhir) >= new Date() &&
            products?.flashsale?.diskon ? (
              <div className="relative">
                <p className="text-red-500 line-through font-light inline me-2">
                  {formatRupiah(products.harga)}
                </p>
                <div className="absolute top-4 right-0">
                  <div className="relative">
                    <BiSolidTag className="absolute top-0 right-0 text-red-500 text-[55px]" />
                    <span className="absolute top-4 right-2.5 text-sm text-white">
                      -{products?.flashsale?.diskon}%
                    </span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-blue-900">
                  {formatRupiah(
                    products.harga -
                      (products.harga * products?.flashsale?.diskon) / 100
                  )}
                </p>
              </div>
            ) : (
              <span className="text-3xl font-bold text-blue-900">
                {formatRupiah(products.harga)}
              </span>
            )}
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
