"use client";

import useAuth from "@/hooks/useAuth";
import { BASE_URL, IMAGE_URL } from "@/utils/config";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PurchaseDetailsPanel({ showPanel, onClose, products }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pricePerBook = products.harga;
  const totalPrice = quantity * pricePerBook;

  const { user } = useAuth();

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Jika ingin tanpa desimal
    }).format(number);
  };

  // Function to handle quantity increase
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle quantity decrease
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/payment/charge", {
        amount: totalPrice,
        email: user?.email,
        phone: user?.phone,
        user_id: user?.id,
        buku_id: products?.id,
        qty: quantity,
        alamat_penerima: user?.alamat,
      });
      const token = response.data.token;

      setLoading(false);
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          router.push("/order");
          console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("wating your payment!");
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

  return (
    <div
      className={`${
        showPanel ? "inset-0 bg-black bg-opacity-50 " : "opacity-0"
      } fixed flex justify-end z-50`}
    >
      <div
        className={`${
          showPanel ? "translate-x-0" : "translate-x-full"
        } bg-white w-full lg:w-1/3 h-full shadow-lg transform transition-transform duration-300`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Detail Pembelian</h2>
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Book Details */}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{products?.judul}</h3>
          <div className="flex items-center">
            <img
              src={IMAGE_URL + "/" + products?.image}
              alt="GAMBAR BUKU"
              className="w-20 h-25 rounded-md mr-4"
            />
            <div className="flex flex-col">
              <p className="text-gray-600">
                Harga:{" "}
                {formatRupiah(
                  new Date(products?.flashsale?.tanggal_akhir) > new Date()
                    ? pricePerBook -
                        (pricePerBook * products?.flashsale?.diskon) / 100
                    : pricePerBook
                )}
              </p>

              {/* Quantity Control */}
              <div className="flex items-center mt-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg text-lg"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="px-4 text-xl">{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg text-lg"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="p-4 border-t">
          <h3 className="text-xl font-semibold mb-4">Detail Pembeli</h3>
          <p className="text-gray-600">
            Nama: <span className="font-bold">{user?.name}</span>
          </p>
          <p className="text-gray-600">
            Email: <span className="font-bold">{user?.email}</span>
          </p>
          <p className="text-gray-600">
            Nomor Telepon: <span className="font-bold">{user?.no_hp}</span>
          </p>
          <p className="text-gray-600">
            Alamat: <span className="font-bold">{user?.alamat}</span>
          </p>
        </div>

        {/* Total and Confirm Purchase */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-bold">
              {formatRupiah(
                new Date(products?.flashsale?.tanggal_akhir) > new Date()
                  ? totalPrice -
                      (totalPrice * products?.flashsale?.diskon) / 100
                  : totalPrice
              )}
            </span>
          </div>

          <button
            className="w-full bg-blue-700 text-white p-3 rounded-lg text-center"
            onClick={handlePayment}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                <circle
                  className="opacity-25 mx-auto block"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Konfirmasi Pembelian"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
