"use client";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { BiSolidBookHeart } from "react-icons/bi";
import { TbBasketDiscount } from "react-icons/tb";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Sidebar({ open, setOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const response = await logout();
    response.status && router.push("/");
  };

  const Menus = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      link: "/admin",
      gap: true,
    },
    { title: "Kelola User", icon: <FaUserGroup />, link: "/admin/users" },
    { title: "Kelola Kategori", icon: <ImBooks />, link: "/admin/category" },
    { title: "Kelola Buku", icon: <BiSolidBookHeart />, link: "/admin/books" },
    {
      title: "Kelola Flash Sales",
      icon: <TbBasketDiscount />,
      link: "/admin/flashsale",
    },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-blue-900 h-full fixed z-10 p-5 pt-8  duration-300`}
      >
        <Link href="/">
          <div className="flex gap-x-4 items-center">
            <img
              src="/images/logoAH.png"
              className={`w-8 h-8 rounded-full cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Al Hikmah
            </h1>
          </div>
        </Link>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer   transition duration-200  text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${
                pathname === Menu.link
                  ? " bg-white text-blue-600"
                  : "text-gray-300 hover:bg-white hover:text-blue-600"
              }`}
            >
              <Link href={`${Menu.link}`}>
                <span className="text-2xl">{Menu.icon}</span>
              </Link>

              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <Link href={`${Menu.link}`}>{Menu.title}</Link>
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Tombol LogOut */}
        <ul className="">
          <li
            className="flex text-red-400 rounded-md p-2 cursor-pointer hover:bg-white hover:text-blue-600 transition duration-200 items-center gap-x-4"
            onClick={handleLogout}
          >
            <RiLogoutCircleLine className="text-2xl" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              LogOut
            </span>
          </li>
        </ul>

        <img
          src="/images/control.png"
          className={`absolute cursor-pointer -right-3 mt-4 w-8 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
      </div>
    </div>
  );
}
