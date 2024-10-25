"use client";
import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import { FaRegUserCircle, FaPlus } from "react-icons/fa";
import axios from "axios";
import AddModalCategory from "./add-modal";
import EditModalCategory from "./edit-modal";
import { BASE_URL } from "@/utils/config";
import { SwalTopEnd } from "@/components/MySwal";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [kategori, setKategori] = useState("");
  const [editedKategori, setEditedKategori] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [render, setRender] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/kategori/create", {
        kategori,
      });
      setLoading(false);

      setRender((prev) => !prev);

      setKategori("");

      SwalTopEnd({
        icon: "success",
        title: "Sukses!",
        text: "Berhasil menambahkan data!",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmitEdit = async (e, kategori) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        BASE_URL + "/kategori/update/" + kategori.id,
        {
          kategori: kategori.kategori,
        }
      );
      SwalTopEnd({
        icon: "success",
        title: "Sukses!",
        text: "Berhasil mengedit Kategori!",
      });
      const filteredKategori = categories.filter(
        (data) => data.id === kategori.id
      );
      const index = categories.indexOf(filteredKategori[0]);
      const temp = categories;
      temp[index] = response.data.data;
      setCategories(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(BASE_URL + "/kategori/delete/" + id);
      SwalTopEnd({
        icon: "success",
        title: "Sukses!",
        text: "Berhasil menghapus Kategori!",
      });
      setCategories((prev) => prev.filter((data) => data.id !== id));
    } catch (error) {
      console.log(error);
      SwalTopEnd({
        icon: "error",
        title: "Gagal!",
        text: "Gagal menghapus Kategori!",
      });
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(BASE_URL + "/kategori/view");
        setCategories(response.data.data);
        setFilteredCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  // Search function
  const searchData = (searchTerm) => {
    if (searchTerm) {
      const filteredData = categories.filter((data) =>
        data.kategori.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filteredData); // Update filtered data
    } else {
      setFilteredCategories(categories); // Reset to full data if search is empty
    }
  };

  useEffect(() => {
    searchData(search);
  }, [search, categories]);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleModalEdit = (kategori) => {
    setEditedKategori({ id: kategori.id, kategori: kategori.kategori });
    setIsEdit(!isEdit);
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
            Kelola Kategori
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
            Tambah Kategori
          </button>
        </div>

        {/* tambah kategori */}
        <AddModalCategory
          setKategori={setKategori}
          handleModal={handleModal}
          handleSubmit={handleSubmit}
          isOpen={isOpen}
          kategori={kategori}
          loading={loading}
        />

        <EditModalCategory
          handleModal={handleModalEdit}
          handleSubmit={handleSubmitEdit}
          isOpen={isEdit}
          kategori={kategori}
          loading={loading}
          setKategori={setKategori}
          editedKategori={editedKategori}
          setEditedKategori={setEditedKategori}
        />

        <div className="mt-8 ml-4">
          <h1 className="text-lg font-semibold text-blue-900">
            Daftar Kategori
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
                    placeholder="Cari kategori..."
                    className="input input-bordered bg-white input-sm w-60  max-w-xs ml-auto block me-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </th>
              </tr>
              <tr className="font-bold text-center text-black  text-sm ">
                <th>ID</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredCategories.map((category, index) => (
                <tr key={index}>
                  <td>{category.id}</td>
                  <td>{category.kategori}</td>
                  <td>
                    <button
                      className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white bg-yellow-400  hover:bg-yellow-500"
                      onClick={() => handleModalEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600"
                      onClick={() => handleDelete(category.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
