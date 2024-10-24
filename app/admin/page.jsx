import {
  FaBook,
  FaRegUserCircle,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import Sidebar from "./sidebar";
import { BASE_URL } from "@/utils/config";

async function FetchData() {
  let resBookJson = null;
  let resUserJson = null;
  let resOrderJson = null;
  try {
    const resBook = await fetch(BASE_URL + "/buku/view", {
      next: { revalidate: 0 },
    });
    const resUser = await fetch(BASE_URL + "/users", {
      next: { revalidate: 0 },
    });
    const resOrder = await fetch(BASE_URL + "/order/view", {
      next: { revalidate: 0 },
    });

    resBookJson = await resBook.json();
    resUserJson = await resUser.json();
    resOrderJson = await resOrder.json();
    return [resBookJson.data, resUserJson, resOrderJson.data];
  } catch (error) {
    console.log(error);
    return [null, null, null];
  }
}

export default async function Page() {
  const [books, users, orders] = await FetchData();

  return (
    <div className="flex">
      <div className="flex-1">
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
                  {books?.length}
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
                  {users?.length}
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
                <p className="text-2xl font-bold text-gray-700 ml-2">
                  {orders?.length}
                </p>
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
              </tr>
            </thead>
            <tbody className="text-center">
              {orders && (
                <>
                  {orders?.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.user.name}</td>
                      <td>{order.buku.judul}</td>
                      <td>{order.qty}</td>
                      <td>{order.alamat_penerima}</td>
                      <td>{order.harga}</td>
                      <td>
                        {order.status === "unpaid" ? (
                          <span className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white  bg-red-500  hover:bg-red-600">
                            {order.status}
                          </span>
                        ) : (
                          <span className="mx-auto w-12 h-7 block rounded-lg text-xs mb-1 text-white bg-green-600  hover:bg-green-700">
                            {order.status}
                          </span>
                        )}
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
