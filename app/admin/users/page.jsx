import axios from "axios";
import Sidebar from "../sidebar";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import TableUser from "./tableUser";

export default async function Page() {
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
          <h1 className="text-2xl font-semibold text-gray-600">Kelola Users</h1>
        </div>
        <div className="mt-8 ml-4">
          <h1 className="text-lg font-semibold text-blue-900">Daftar Users</h1>
        </div>

        <TableUser />
      </div>
    </div>
  );
}
