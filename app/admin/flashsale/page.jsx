"use client";
import { use, useEffect, useState } from "react";
import Sidebar from "../sidebar";
import { FaRegUserCircle, FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "@/utils/config";
import { SwalTopEnd } from "@/components/MySwal";
export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [flashSale, setFlashSale] = useState({});
  const [diskon, setDiskon] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredFlashSale, setFilteredFlashSale] = useState([]);
  const [render, setRender] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
    setDiskon("");
    setDate("");
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        BASE_URL + "/flash-sale/delete/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
          },
        }
      );
      SwalTopEnd({
        title: "Sukses!",
        icon: "success",
        text: "Berhasil menghapus flashsale!",
      });
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + "/flash-sale");
        setFlashSale(response.data.data);
        setFilteredFlashSale(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    searchData(search);
  }, [search, render]);

  const searchData = (searchValue) => {
    if (searchValue) {
      const filteredData = flashSale.filter((data) =>
        // Mencari berdasarkan diskon atau tanggal
        data.diskon.toString().includes(searchValue)
      );
      setFilteredFlashSale(filteredData);
    } else {
      setFilteredFlashSale(flashSale);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + "/flash-sale/create",
        {
          diskon: diskon,
          tanggal_akhir: date,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
          },
        }
      );
      setLoading(false);
      SwalTopEnd({
        icon: "success",
        title: "Sukses!",
        text: "Berhasil menambahkan flashsale!",
      });
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="w-full h-[70px] bg-white shadow-md shadow-slate-300 ">
          <div className="flex gap-4 justify-end py-4">
            <p className="text-xl font-semibold text-gray-600 ">Admin</p>
            <FaRegUserCircle className="text-3xl mr-5 shadow-sm shadow-black rounded-full text-gray-500" />
          </div>
        </div>
        <div className="mt-5 ml-4">
          <h1 className="text-2xl font-semibold text-gray-600">
            Kelola Flash Sale
          </h1>
        </div>

        <div className="">
          <button
            className=" block btn ml-auto bg-blue-900 hover:bg-blue-950 border-none rounded-xl text-white  mr-4 mt-5"
            onClick={handleModal}
          >
            <span>
              <FaPlus className="inline mr-2" />
            </span>
            Tambah Flash Sale
          </button>
        </div>
        {/* tambah flash sale */}
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className=" modal-box bg-slate-100 rounded-lg">
            <h3 className="text-center my-2 text-lg text-blue-700 font-bold">
              Tambah Flash Sale
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full">
                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Diskon(%)
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="misal 20%"
                  value={diskon}
                  onChange={(e) => setDiskon(e.target.value)}
                />

                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Tanggal Akhir
                </label>
                <input
                  type="datetime-local"
                  id="date_value"
                  className="input input-bordered h-11 mb-2 bg-white text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-4 h-8 text-sm bg-blue-700 hover:bg-blue-900 rounded-btn text-white me-2 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading ? "disabled" : ""}
                >
                  {loading && (
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                  )}
                  <span>Simpan</span>
                </button>
                <button
                  className="w-20 h-8 text-sm bg-red-500 hover:bg-red-600 rounded-btn text-white"
                  onClick={handleModal}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 ml-4">
          <h1 className="text-lg font-semibold text-blue-900">
            Daftar Flash Sale
          </h1>
        </div>

        <div className="mx-4 mt-3 ">
          <table className="table border-2 w-full">
            {/* head */}
            <thead className="bg-slate-100">
              <tr className="border-none">
                <th colSpan={8}>
                  <input
                    type="text"
                    placeholder="cari..."
                    className="input input-bordered bg-white input-sm w-60 max-w-xs ml-auto block me-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </th>
              </tr>
              <tr className="font-bold text-center text-black  text-sm ">
                <th>ID</th>
                <th>Diskon(%) </th>
                <th>Waktu Berakhir</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              {flashSale.length && (
                <>
                  {filteredFlashSale.map((data, index) => (
                    <tr key={index}>
                      <td>{index}</td>

                      <td>{data.diskon}</td>

                      <td>{data.tanggal_akhir}</td>

                      <td className="flex gap-2 justify-center">
                        <button
                          type="button"
                          onClick={() => handleDelete(data.id)}
                        >
                          <FaTrashAlt className="text-2xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
