"use client";

import Link from "next/link";
import { FaBook } from "react-icons/fa6";

export default function CardCategory(props) {
  console.log(props);
  return (
    <Link
      className={`w-auto h-12 border-2 text-white ${props.color} rounded-2xl flex items-center border-solid border-gray-300 transform transition-transform duration-200 hover:scale-105`}
      href={"/category/" + props?.category?.id}
    >
      <FaBook className="text-xl ml-3" />
      <span className="w-[2px] h-1/2 bg-white ms-2"></span>
      <span>
        <h3 className="text-base ms-2 me-3">{props?.category?.kategori}</h3>
      </span>
    </Link>
  );
}
