"use client";

import { SwalTopEnd } from "@/components/MySwal";
import Navbar from "@/components/navbar";
import { CartContext } from "@/context/cartContext";
import { BASE_URL, IMAGE_URL } from "@/utils/config";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState([]);
  const [render, setRender] = useState(false);

  const { cartCount, setCartCount } = useContext(CartContext);

  const handleDeleteCart = async (id) => {
    try {
      const response = await axios.delete(
        BASE_URL + "/keranjang/delete/" + id,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
          },
        }
      );
      SwalTopEnd({
        title: "Berhasil",
        text: response.data.message,
        icon: "success",
      });
      setRender((prev) => !prev);
      setCartCount(response.data.jumlah_keranjang);
    } catch (error) {
      setRender((prev) => !prev);
      SwalTopEnd({
        title: "Gagal",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + "/keranjang/view", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
          },
        });
        setCart(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
        setCart([]);
      }
    };
    fetchData();
  }, [render]);
  return (
    <>
      <Navbar />
      <div className="h-screen m-11">
        <div className="flex justify-between mb-5">
          <h3
            className="text-xl text-blue-800 mb-4 font-bold
      "
          >
            Keranjang Saya
          </h3>
          <button className="py-2 px-4 rounded-lg border-2 border-blue-900 text-blue-900 font-semibold bg-slate-300  hover:bg-slate-400 hover:text-white hover:font-bold">
            Beli Sekarang
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-2 w-full">
            {/* head */}
            <thead>
              <tr className="font-bold text-center text-white border-2 border-blue-900 text-sm bg-blue-900">
                <th>Produk</th>
                <th>Judul Buku</th>
                <th>Kuantitas</th>
                <th>Harga</th>
                <th>Total Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center bg-slate-300 border-2 border-blue-900">
              {cart.length ? (
                <>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <th>
                        <img
                          src={`${IMAGE_URL}/${item.buku.gambar}`}
                          alt="gambar buku"
                          className="w-15 h-20 object-cover mx-auto"
                        />
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="font-bold mx-auto">
                            {item.buku.judul}
                          </div>
                        </div>
                      </td>
                      <td>{item.qty}</td>
                      <td>Rp. {item.buku.harga}</td>
                      <td>Rp. {item.total_harga}</td>
                      <th className="bg-slate-300">
                        <span>
                          {" "}
                          <button
                            className="w-14 h-7 rounded-lg text-xs text-white bg-red-500  hover:bg-red-600"
                            onClick={() => handleDeleteCart(item.buku.id)}
                          >
                            Hapus
                          </button>{" "}
                        </span>
                      </th>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
