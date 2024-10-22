"use client";
import React, { use, useEffect, useState } from "react";
import Sidebar from "../sidebar";
import { FaImage, FaRegUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import EditModalBook from "./edit-modal";
import { BASE_URL, IMAGE_URL } from "@/utils/config";
export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedBook, setEditedBook] = useState({});
  const [products, setProducts] = useState([]); // categories
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [penulis, setPenulis] = useState("");
  const [stok, setStok] = useState("");
  const [harga, setHarga] = useState("");
  const [jumlahHalaman, setJumlahHalaman] = useState("");
  const [tahunterbit, setTahunTerbit] = useState("");
  const [isbn, setIsbn] = useState("");
  const [bahasa, setBahasa] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFlashsale, setDataFlashsale] = useState([]);
  const [valueIdFlashsale, setValueIdFlashsale] = useState("");
  const [valueIdCategory, setValueIdCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [cover, setCover] = useState("");
  const [render, setRender] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + "/buku/create",
        {
          id_kategori: Number(valueIdCategory),
          id_flash_sales: Number(valueIdFlashsale),
          penerbit,
          judul,
          penulis,
          harga,
          deskripsi,
          stok,
          halaman: jumlahHalaman,
          thn_terbit: tahunterbit,
          bahasa,
          isbn,
          gambar: cover,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
          },
        }
      );

      setLoading(false);

      setPenerbit("");
      setJudul("");
      setPenulis("");
      setHarga("");
      setDeskripsi("");
      setStok("");
      setJumlahHalaman("");
      setTahunTerbit("");
      setBahasa("");
      setIsbn("");

      setRender((prev) => !prev);

      alert("Berhasil menambahkan data!");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(BASE_URL + "/buku/view?latest");
        const responseFlashsale = await axios.get(
          BASE_URL + "/flash-sale/view"
        );
        const responseKategori = await axios.get(BASE_URL + "/kategori/view");
        setCategories(responseKategori.data.data);
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // Inisial data filter
        setValueIdCategory(responseKategori.data.data[0].id);
        setValueIdFlashsale(responseFlashsale.data.data[0].id);
        setDataFlashsale(responseFlashsale.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [render]);

  //search function
  const searchData = (searchTerm) => {
    if (searchTerm) {
      const filteredData = products.filter((data) =>
        data.judul.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredData); // Update filtered data
    } else {
      setFilteredProducts(products); // Reset to full data if search is empty
    }
  };

  useEffect(
    () => {
      searchData(search);
    },
    [search],
    products
  );

  const handleSubmitEdit = async (e, book) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("penerbit", penerbit);
      formData.append("penulis", penulis);
      formData.append("judul", judul);
      formData.append("deskripsi", deskripsi);
      formData.append("stok", stok);
      formData.append("halaman", jumlahHalaman);
      formData.append("thn_terbit", tahunterbit);
      formData.append("bahasa", bahasa);
      formData.append("isbn", isbn);
      formData.append("id_kategori", valueIdCategory);
      formData.append("id_flash_sales", valueIdFlashsale);
      formData.append("gambar", cover);
      formData.append("harga", harga);
      formData.append("_method", "put");
      const response = await axios.post(
        BASE_URL + "/buku/update/" + book.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
          },
        }
      );
      console.log(response.data);
      setRender((prev) => !prev);
      alert("berhasil update");
    } catch (error) {
      alert("Gagal update buku");
      console.log(error);
    }
  };

  const handleModalEdit = (book) => {
    setEditedBook(book);
    setJudul(book.judul);
    setPenerbit(book.penerbit);
    setPenulis(book.penulis);
    setHarga(book.harga);
    setDeskripsi(book.deskripsi);
    setStok(book.stok);
    setJumlahHalaman(book.halaman);
    setTahunTerbit(book.thn_terbit);
    setBahasa(book.bahasa);
    setIsbn(book.isbn);
    setValueIdCategory(book.kategori.id);
    setValueIdFlashsale(book.flashsale.id);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(BASE_URL + "/buku/delete/" + id);
      alert("berhasil menghapus Buku!");
      console.log(response.data);
      setProducts((prev) => prev.filter((data) => data.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleModaleditOpen = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="w-full h-[70px] bg-white shadow-md shadow-slate-300 ">
          <div className="flex gap-4 justify-end py-4">
            <p className="text-xl font-semibold text-gray-600 ">Admin</p>
            <FaRegUserCircle className="text-3xl mr-5 shadow-sm shadow-black rounded-full text-gray-500" />
          </div>
        </div>
        <div className="mt-5 ml-4">
          <h1 className="text-2xl font-semibold text-gray-600">Kelola Buku</h1>
        </div>

        <div className="">
          <button
            className=" block btn ml-auto bg-blue-900 hover:bg-blue-950 border-none rounded-xl text-white  mr-4 mt-5"
            onClick={handleModal}
          >
            <span>
              <FaPlus className="inline mr-2" />
            </span>
            Tambah Buku
          </button>
        </div>
        <EditModalBook
          setIsEdit={setIsEdit}
          handleSubmit={handleSubmitEdit}
          isOpen={isEdit}
          editedBook={editedBook}
          judul={judul}
          penerbit={penerbit}
          penulis={penulis}
          harga={harga}
          deskripsi={deskripsi}
          stok={stok}
          jumlahHalaman={jumlahHalaman}
          tahunterbit={tahunterbit}
          bahasa={bahasa}
          isbn={isbn}
          valueIdCategory={valueIdCategory}
          valueIdFlashsale={valueIdFlashsale}
          setJudul={setJudul}
          setPenerbit={setPenerbit}
          setPenulis={setPenulis}
          setHarga={setHarga}
          setDeskripsi={setDeskripsi}
          setStok={setStok}
          setJumlahHalaman={setJumlahHalaman}
          setTahunTerbit={setTahunTerbit}
          setBahasa={setBahasa}
          setIsbn={setIsbn}
          setValueIdCategory={setValueIdCategory}
          setValueIdFlashsale={setValueIdFlashsale}
          categories={categories}
          flashsales={dataFlashsale}
          loading={loading}
          setCover={setCover}
          cover={cover}
        />

        {/* tambah buku */}
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box bg-slate-100 rounded-lg mx-auto">
            <h3 className="text-center my-2 text-lg text-blue-700 font-bold">
              Tambahkan Buku
            </h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-control w-full">
                <label className="label font-semibold text-sm text-blue-700">
                  Judul Buku
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white text-sm"
                  placeholder="Masukkan Judul "
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                />
                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Cover Buku
                </label>

                <input
                  type="file"
                  id="cover"
                  className=" flex h-11 w-full rounded-md input input-bordered bg-white px-3 py-2 text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium
                file:bg-stone-50 file:text-stone-700
                hover:file:cursor-pointer hover:file:bg-blue-50
                hover:file:text-blue-700"
                  onChange={(e) => setCover(e.target.files[0])}
                />
                <div className="flex items-center justify-center w-[200px] p-2 mx-auto mt-2 border-2 border-dashed rounded-md border-stone-300">
                  {cover ? (
                    <img
                      src={URL.createObjectURL(cover)}
                      alt="preview"
                      className="object-cover w-[200px]"
                    />
                  ) : (
                    <label
                      htmlFor="cover"
                      className="flex flex-col items-center justify-center  cursor-pointer"
                    >
                      <FaImage className="text-3xl text-stone-500" />
                      <p className="text-sm text-stone-500">
                        Klik untuk memilih gambar
                      </p>
                    </label>
                  )}
                </div>

                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Deskripsi Buku
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="Deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Penerbit Buku
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="Penerbit"
                  value={penerbit}
                  onChange={(e) => setPenerbit(e.target.value)}
                />
                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Penulis Buku
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="Penulis"
                  value={penulis}
                  onChange={(e) => setPenulis(e.target.value)}
                />
                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Stok Buku
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="Stok"
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                />
                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Harga Buku
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="Harga"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                />

                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  ISBN
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="Isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Bahasa
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="bahasa"
                  value={bahasa}
                  onChange={(e) => setBahasa(e.target.value)}
                />
                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Tahun Terbit
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="tahun Terbit"
                  value={tahunterbit}
                  onChange={(e) => setTahunTerbit(e.target.value)}
                />

                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Jumlah Halaman
                </label>
                <input
                  type="text"
                  className="input input-bordered h-11 mb-2 bg-white  text-sm"
                  placeholder="Halaman"
                  value={jumlahHalaman}
                  onChange={(e) => setJumlahHalaman(e.target.value)}
                />

                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Kategori
                </label>
                <select
                  className="select select-bordered bg-white"
                  value={valueIdCategory}
                  onChange={(e) => setValueIdCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {categories.map((data, index) => (
                    <option value={data.id} key={index}>
                      {data.kategori}
                    </option>
                  ))}
                </select>

                <label className="label font-semibold text-sm text-blue-700 mt-2">
                  Flash Sale
                </label>
                <select
                  className="select select-bordered bg-white"
                  value={valueIdFlashsale}
                  onChange={(e) => setValueIdFlashsale(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Flash Sale
                  </option>
                  {dataFlashsale.map((data, index) => (
                    <option value={data.id} key={index}>
                      {data.tanggal_akhir ? data.tanggal_akhir : "-"}
                    </option>
                  ))}
                </select>
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
                  className="w-20 h-8 text-sm bg-red-500 hover:bg-red-600 rounded-btn text-white "
                  type="button"
                  onClick={handleModal}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* akhir tambah buku */}

        <div className="mt-8 ml-4">
          <h1 className="text-lg font-semibold text-blue-900">Daftar Buku</h1>
        </div>

        <div className="mx-4 mt-3 ">
          <table className="table border-2 w-full">
            {/* head */}
            <thead className="bg-slate-100">
              <tr className="border-none">
                <th colSpan={10}>
                  <input
                    type="text"
                    placeholder="Cari Buku..."
                    className="input input-bordered bg-white input-sm w-60 max-w-xs ml-auto block me-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </th>
              </tr>
              <tr className="font-bold text-center text-black  text-sm ">
                <th>No</th>
                <th>Cover</th>
                <th>Judul Buku</th>
                <th>Penerbit</th>
                <th>Pengarang</th>
                <th>ISBN</th>
                <th>Harga</th>
                <th>Kategori</th>
                <th>Flash Sale</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`${IMAGE_URL}/${product.image}`}
                      alt=""
                      className="w-16 mx-auto"
                    />
                  </td>
                  <td>{product.judul}</td>
                  <td>{product.penerbit}</td>
                  <td>{product.penulis}</td>
                  <td>{product.isbn}</td>
                  <td>{product.harga}</td>
                  <td>{product.kategori.kategori}</td>
                  <td>{product.flashsale.tanggal_akhir}</td>
                  <td className="">
                    <button
                      className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white bg-yellow-400  hover:bg-yellow-500"
                      onClick={() => handleModalEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600"
                      onClick={() => handleDelete(product.id)}
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
