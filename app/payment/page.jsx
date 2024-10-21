export default function Page() {
  return (
    <>
      <h1 className=" text-blue-900 font-bold text-2xl text-center my-3">
        Pembayaran
      </h1>
      <div className="h-screen justify-center flex  gap-4 mt-4">
        <div className="shadow-lg border-2 w-[350px] h-auto py-5 rounded-2xl justify-around items-center bg-slate-100 mb-3">
          <h2 className="text-lg font-bold text-center text-blue-900 mb-2 ">
            Alamat Pengiriman
          </h2>
          <div className="w-[250px] m-auto">
            <label className="label-text mt-2 ml-1 font-bold text-blue-900">
              Nama Lengkap
            </label>
            <label className="input input-bordered h-10 flex items-center gap-2 mb-2 mt-1 bg-white">
              <input
                type="text"
                className="text-sm "
                placeholder="Nama Lengkap"
              />
            </label>

            <label className="label-text mt-2 ml-1 font-bold text-blue-900">
              Jenis Kelamin
            </label>
            <label className="input input-bordered h-10 flex items-center gap-2 mb-2 mt-1 bg-white">
              <input
                type="text"
                className="grow text-sm"
                placeholder="Jenis Kelamin"
              />
            </label>

            <label className="label-text mt-2 ml-1 font-bold text-blue-900">
              No Hp
            </label>
            <label className="input input-bordered h-10 flex items-center gap-2 mb-2 mt-1 bg-white">
              <input type="text" className="grow text-sm" placeholder="No Hp" />
            </label>

            <label className="label-text mt-2 ml-1 font-bold text-blue-900">
              Email
            </label>
            <label className="input input-bordered h-10 flex items-center gap-2 mb-2 mt-1 bg-white">
              <input type="text" className="grow text-sm" placeholder="Email" />
            </label>

            <label className="label-text mt-2 ml-1 font-bold text-blue-900">
              Alamat Lengkap
            </label>
            <label className="input input-bordered h-10 flex items-center gap-2 mt-1 mb-3 bg-white">
              <input
                type="text"
                className="grow text-sm"
                placeholder="Alamat"
              />
            </label>

            <div className="text-center">
              <button className="w-60 h-8 mt-3 rounded-xl text-sm text-white bg-blue-900 hover:bg-blue-700">
                Kirim
              </button>
            </div>
          </div>
        </div>

        <div className="w-[400px] ">
          <div className="w-full h-auto shadow-lg border-2 bg-slate-100 rounded-2xl p-5 text-blue-900">
            <div className="flex gap-4 items-center justify-between mb-2">
              <img src="/images/ips.jpg" alt="" className="w-15 h-20" />
              <p className="font-semibold">Bahasa Indonesia</p>
              <p className="font-bold">Rp. 100.000</p>
            </div>
            <p className="border-b-2 border-slate-300"></p>
            <div className="flex justify-between my-3">
              <p className="font-semibold">SubTotal</p>
              <p className="font-bold">Rp. 100.000</p>
            </div>
            <p className="border-b-2 border-slate-300"></p>
            <div className="flex justify-between my-3">
              <p className="font-semibold">Ongkir</p>
              <p className="font-bold">Free</p>
            </div>
            <p className="border-b-2 border-slate-300"></p>
            <div className="flex justify-between my-3">
              <p className="font-semibold">Total</p>
              <p className="font-bold">Rp. 100.000</p>
            </div>
            <div className="text-center">
              <button className="w-60 h-8 mt-3 rounded-xl text-sm text-white bg-blue-900 hover:bg-blue-700">
                Selesaikan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
