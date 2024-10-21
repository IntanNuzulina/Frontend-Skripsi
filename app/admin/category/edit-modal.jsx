export default function EditModalCategory({
  isOpen,
  handleSubmit,
  kategori,
  setKategori,
  loading,
  handleModal,
  editedKategori,
  setEditedKategori,
}) {
  return (
    <div className={isOpen ? "modal modal-open" : "modal"}>
      <div className="modal-box bg-slate-100 rounded-lg mx-auto">
        <h3 className="text-center my-2 text-lg text-blue-700 font-bold">
          Edit Kategori Buku
        </h3>
        <form onSubmit={(e) => handleSubmit(e, editedKategori)}>
          <div className="form-control w-full">
            <label className="label font-semibold text-sm text-blue-700">
              Nama Kategori
            </label>
            <input
              type="text"
              className="input input-bordered h-11 mb-2 bg-white text-sm"
              placeholder="Masukkan nama Kategori "
              value={editedKategori.kategori}
              onChange={(e) =>
                setEditedKategori({
                  id: editedKategori.id,
                  kategori: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mt-4 flex justify-end ">
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
              type="button"
              onClick={handleModal}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
