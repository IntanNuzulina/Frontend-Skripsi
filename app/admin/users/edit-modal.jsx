export default function EditModalUser({
  isOpen,
  handleSubmit,
  name,
  email,
  setName,
  setEmail,
  handleModal,
}) {
  return (
    <div className={isOpen ? "modal modal-open" : "modal"}>
      <div className="modal-box bg-slate-100 rounded-lg mx-auto">
        <h3 className="text-center my-2 text-lg text-blue-700 font-bold">
          Edit User
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full">
            <label className="label font-semibold text-sm text-blue-700">
              Nama User
            </label>
            <input
              type="text"
              className="input input-bordered h-11 mb-2 bg-white text-sm"
              placeholder="Masukkan Judul "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="label font-semibold text-sm text-blue-700">
              Email User
            </label>
            <input
              type="text"
              className="input input-bordered h-11 mb-2 bg-white text-sm"
              placeholder="Masukkan Judul "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
