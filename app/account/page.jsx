"use client";
import Navbar from "@/components/navbar";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const { user, logout } = useAuth();
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logout();
    response.status && router.push("/");
  };

  useEffect(() => {
    if (user) {
      const fullName = user?.name;
      const nameParts = fullName?.split(" ");
      setFirst(nameParts[0].charAt(0));
      if (nameParts.length > 1) setSecond(nameParts[1].charAt(0));
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <div className="h-screen lg:h-[550px] flex justify-center items-center ">
        <div className="border-2 pb-5 w-[600px]  my-3 mx-5 rounded-2xl bg-slate-300 border-solid border-blue-900 shadow-md ">
          <div className="mx-auto my-auto relative">
            <div
              tabIndex={0}
              className="w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-blue-900 font-semibold text-white"
            >
              <span className="text-[50px] mb-2">{`${first}${second}`}</span>
            </div>
          </div>
          <h2 className="text-lg font-bold text-center text-blue-900 mt-20 uppercase">
            {user?.name}
          </h2>

          <div className="ml-16 mt-8">
            <ul className="text-base font-bold text-blue-900">
              <li>
                <a href="/">Beranda</a>
              </li>
              <li>
                <a href="/cart">Keranjang Saya</a>
              </li>
              <li>
                <a href="/order">Riwayat Order</a>
              </li>
            </ul>
          </div>

          <div className="text-right mr-10 mt-14">
            <Link href="">
              <button
                className="w-28 h-8  rounded-xl text-sm text-white font-bold bg-blue-900 hover:bg-red-500"
                onClick={handleLogout}
              >
                Keluar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
