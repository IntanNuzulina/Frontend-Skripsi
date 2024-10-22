import Navbar from "@/components/navbar";

export default function OrderHistory() {
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
            <tr>
              <td>1</td>
              <td className="flex justify-center items-center">
                <img src="/images/bahasa.jpg" alt="" className="w-15 h-20" />
              </td>
              <td>IPS</td>
              <td>1</td>
              <td>Mila</td>
              <td>Rp. 200.000</td>
              <td className="">
                <button className="mx-auto w-16 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                  Proses
                </button>
                {/* <button className="mx-auto w-16 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                  Gagal
                </button>
                <button className="mx-auto w-16 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                  Selesai
                </button> */}
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>2</td>
              <td className="flex justify-center items-center">
                <img src="/images/bahasa.jpg" alt="" className="w-15 h-20" />
              </td>
              <td>IPS</td>
              <td>1</td>
              <td>Mila</td>
              <td>Rp. 200.000</td>
              <td className="">
                {/* <button className="mx-auto w-16 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                  Proses
                </button> */}
                <button className="mx-auto w-16 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                  Gagal
                </button>
                {/* <button className="mx-auto w-16 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                  Selesai
                </button> */}
              </td>
            </tr>

            {/* row 3 */}
            <tr>
              <td>3</td>
              <td className="flex justify-center items-center">
                <img src="/images/bahasa.jpg" alt="" className="w-15 h-20" />
              </td>
              <td>IPS</td>
              <td>1</td>
              <td>Mila</td>
              <td>Rp. 200.000</td>
              <td className="">
                {/* <button className="mx-auto w-16 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                  Proses
                </button> */}
                {/* <button className="mx-auto w-16 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                  Gagal
                </button> */}
                <button className="mx-auto w-16 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                  Selesai
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
