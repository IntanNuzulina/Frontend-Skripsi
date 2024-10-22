"use client";

import Navbar from "@/components/navbar";
import { BASE_URL, IMAGE_URL } from "@/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/order/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
            Accept: "application/json",
          },
        });
        setOrder(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="mt-8 ml-16">
        <h1 className="text-[18px] font-semibold text-blue-900">
          Riwayat Order
        </h1>
      </div>
      <div className="mx-4 mt-2 md:mx-16">
        <table className="table border-2 border-blue-900 w-full">
          {/* head */}
          <thead className="bg-slate-300">
            <tr className="font-bold text-center text-black text-sm ">
              <th>No</th>
              <th>Cover</th>
              <th>Judul Buku</th>
              <th>Jumlah</th>
              <th>Alamat</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row 1 */}
            {order.length > 0 && (
              <>
                {order.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="flex justify-center items-center">
                      <img
                        src={`${IMAGE_URL}/${item.buku.image}`}
                        alt="Gambar Buku"
                        className="w-15 h-20"
                      />
                    </td>
                    <td>{item.buku.judul}</td>
                    <td>{item.qty}</td>
                    <td>{item.alamat_penerima}</td>
                    <td>Rp. {item.harga}</td>
                    <td className="">
                      {item.status === "unpaid" ? (
                        <button className="mx-auto w-16 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                          Proses
                        </button>
                      ) : (
                        <button className="mx-auto w-16 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                          Selesai
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
