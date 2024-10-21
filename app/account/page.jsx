import Navbar from "@/components/navbar";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="h-screen lg:h-[550px] flex justify-center items-center ">
        <div className="border-2 w-[800px] h-[400px]  my-3 mx-5 rounded-2xl bg-slate-300 border-solid border-blue-900 shadow-md ">
          <div className="mx-auto my-auto">
            <VscAccount className="text-9xl mx-auto mt-6  text-blue-900" />{" "}
            <h2 className="text-lg font-bold text-center text-blue-900">
              Intan Nuzulina
            </h2>
          </div>

          <div className="ml-16 mt-8">
            <ul className="text-base font-bold text-blue-900">
              <li>
                <a href="/">Beranda</a>
              </li>
              <li>
                <a href="/cart">Keranjang Saya</a>
              </li>
              <li>
                <a href="/Order_History">Riwayat Order</a>
              </li>
            </ul>
          </div>

          <div className="text-right mr-10 mt-14">
            <Link href="">
              <button className="w-28 h-8  rounded-xl text-sm text-white font-bold bg-blue-900 hover:bg-red-500">
                Keluar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
