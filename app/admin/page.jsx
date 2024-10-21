import {
  FaBook,
  FaRegUserCircle,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import Sidebar from "./sidebar";

async function FetchData() {
  const resBook = await fetch("http://202.10.40.136/api/buku/view");
  const resBookJson = await resBook.json();
  const resUser = await fetch("http://202.10.40.136/api/users");
  const resUserJson = await resUser.json();

  return [resBookJson.data, resUserJson];
}

export default async function Page() {
  const [books, users] = await FetchData();

  return (
    <div className="flex">
      <Sidebar />
      <div className=" flex-1">
        <div className="w-full h-[70px] sticky top-0 z-50 bg-white shadow-md shadow-slate-300 ">
          <div className="flex gap-4 justify-end py-4">
            <p className="text-xl font-semibold text-gray-600 ">Admin</p>
            <FaRegUserCircle className="text-3xl mr-5 shadow-sm shadow-black rounded-full text-gray-500" />
          </div>
        </div>
        <div className="mt-5 ml-4">
          <h1 className="text-2xl font-semibold text-gray-600">Dashboard</h1>
        </div>
        <div className="flex mx-4 gap-x-5 mt-3">
          <div className="sm:w-1/2 md:w-1/3 h-auto bg-white shadow-slate-200 border-2 border-blue-900 rounded-md py-3 pl-3 relative">
            <div className="absolute left-0 top-0 bottom-0 bg-blue-900 w-2"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-600 ml-2">
                  Jumlah buku
                </p>
                <p className="text-2xl font-bold text-gray-700 ml-2">
                  {/* {books.length} */}
                </p>
              </div>
              <FaBook className="text-gray-300 text-3xl mr-3" />{" "}
            </div>
          </div>
          <div className=" sm:w-1/2 md:w-1/3 h-auto bg-white shadow-slate-200 border-2 border-blue-900 rounded-md py-3 pl-3 relative">
            <div className="absolute left-0 top-0 bottom-0 bg-blue-900 w-2"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-600 ml-2">
                  Users
                </p>
                <p className="text-2xl font-bold text-gray-700 ml-2">
                  {/* {users.length} */}
                </p>
              </div>
              <FaUser className="text-gray-300 text-3xl mr-3" />{" "}
            </div>
          </div>

          <div className=" sm:w-1/2 md:w-1/3 h-auto bg-white shadow-slate-200 border-2 border-blue-900 rounded-md py-3 pl-3 relative">
            <div className="absolute left-0 top-0 bottom-0 bg-blue-900 w-2"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-600 ml-2">
                  Terjual
                </p>
                <p className="text-2xl font-bold text-gray-700 ml-2">90</p>
              </div>
              <FaShoppingCart className="text-gray-300 text-3xl mr-4" />{" "}
            </div>
          </div>
        </div>
        <div className="mt-8 ml-4">
          <h1 className="text-lg font-semibold text-blue-900">Riwayat Order</h1>
        </div>
        <div className="mx-4 mt-2 ">
          <table className="table border-2 w-full">
            {/* head */}
            <thead className="bg-slate-100">
              <tr className="border-none">
                <th colSpan={8}>
                  <input
                    type="text"
                    placeholder="cari..."
                    className="input input-bordered bg-white input-sm w-60 max-w-xs ml-auto block me-4"
                  />
                </th>
              </tr>
              <tr className="font-bold text-center text-black text-sm ">
                <th>No</th>
                <th>Nama</th>
                <th>Judul Buku</th>
                <th>Jumlah</th>
                <th>Alamat</th>
                <th>Total</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              <tr>
                <td>1</td>
                <td>Intan</td>
                <td>IPS</td>
                <td>1</td>
                <td>Mila</td>
                <td>Rp. 200.000</td>
                <td>Berhasil Terkirim</td>
                <td className="">
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                    Kirim
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                    Gagal
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                    Selesai
                  </button>
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>2</td>
                <td>Intan</td>
                <td>IPS</td>
                <td>1</td>
                <td>Mila</td>
                <td>Rp. 200.000</td>
                <td>Berhasil Terkirim</td>
                <td className="">
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                    Kirim
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                    Gagal
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                    Selesai
                  </button>
                </td>
              </tr>

              {/* row 3 */}
              <tr>
                <td>3</td>
                <td>Intan</td>
                <td>IPS</td>
                <td>1</td>
                <td>Mila</td>
                <td>Rp. 200.000</td>
                <td>Berhasil Terkirim</td>
                <td className="">
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                    Kirim
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                    Gagal
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                    Selesai
                  </button>
                </td>
              </tr>

              {/* row 4 */}
              <tr>
                <td>4</td>
                <td>Intan</td>
                <td>IPS</td>
                <td>1</td>
                <td>Mila</td>
                <td>Rp. 200.000</td>
                <td>Berhasil Terkirim</td>
                <td className="">
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                    Kirim
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                    Gagal
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                    Selesai
                  </button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Intan</td>
                <td>IPS</td>
                <td>1</td>
                <td>Mila</td>
                <td>Rp. 200.000</td>
                <td>Berhasil Terkirim</td>
                <td className="">
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                    Kirim
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                    Gagal
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                    Selesai
                  </button>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>Intan</td>
                <td>IPS</td>
                <td>1</td>
                <td>Mila</td>
                <td>Rp. 200.000</td>
                <td>Berhasil Terkirim</td>
                <td className="">
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                    Kirim
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                    Gagal
                  </button>
                  <button className="mx-auto w-12 h-7 block rounded-lg text-xs text-white bg-blue-700  hover:bg-blue-900">
                    Selesai
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
