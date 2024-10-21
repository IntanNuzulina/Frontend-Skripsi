import { FaImage } from "react-icons/fa";

export default function EditModalBook({
  isOpen,
  setIsEdit,
  judul,
  setJudul,
  deskripsi,
  setDeskripsi,
  penerbit,
  setPenerbit,
  penulis,
  setPenulis,
  stok,
  setStok,
  harga,
  setHarga,
  jumlahHalaman,
  setJumlahHalaman,
  tahunterbit,
  setTahunTerbit,
  isbn,
  setIsbn,
  bahasa,
  setBahasa,
  setValueIdCategory,
  setValueIdFlashsale,
  valueIdCategory,
  valueIdFlashsale,
  setCover,
  cover,
  editedBook,
  categories,
  flashsales,
  handleSubmit,
}) {
  return (
    <div className={isOpen ? "modal modal-open" : "modal"}>
      <div className="modal-box bg-slate-100 rounded-lg mx-auto">
        <h3 className="text-center my-2 text-lg text-blue-700 font-bold">
          Edit Buku
        </h3>
        <form onSubmit={(e) => handleSubmit(e, editedBook)}>
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
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.kategori}
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
              {flashsales?.map((flashsale) => (
                <option key={flashsale.id} value={flashsale.id}>
                  {flashsale.tanggal_akhir}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="px-4 h-8 text-sm bg-blue-700 hover:bg-blue-900 rounded-btn text-white me-2 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span>Simpan</span>
            </button>
            <button
              className="w-20 h-8 text-sm bg-red-500 hover:bg-red-600 rounded-btn text-white "
              type="button"
              onClick={() => setIsEdit(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
