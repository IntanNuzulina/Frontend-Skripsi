"use client";

import { SwalTopEnd } from "@/components/MySwal";
import Navbar from "@/components/navbar";
import { CartContext } from "@/context/cartContext";
import useAuth from "@/hooks/useAuth";
import { BASE_URL, IMAGE_URL } from "@/utils/config";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState([]);
  const [render, setRender] = useState(false);

  const { cartCount, setCartCount } = useContext(CartContext);

  const { user } = useAuth();

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

  const handlePayment = async (item) => {
    try {
      const response = await axios.post(BASE_URL + "/payment/charge", {
        amount: item.total_harga,
        first_name: user?.name,
        email: user?.email,
        phone: user?.phone,
        user_id: user?.id,
        buku_id: item.buku.id,
        qty: item.qty,
        alamat_penerima: user?.alamat,
      });
      const token = response.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("wating your payment...");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
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

    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [render]);
  return (
    <>
      <Navbar />
      <div className="h-screen m-11">
        <div className=" mb-5">
          <h3
            className="text-xl text-blue-800 mb-4 font-bold
      "
          >
            Keranjang Saya
          </h3>
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
                      <td>
                        <span className="font-bold">{item.qty}</span>
                      </td>
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
                          <button
                            className="w-14 h-7 rounded-lg text-xs text-white bg-green-500  hover:bg-green-600"
                            onClick={() => handlePayment(item)}
                          >
                            Beli
                          </button>
                        </span>
                      </th>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
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
