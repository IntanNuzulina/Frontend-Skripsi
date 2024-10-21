"use client";
import Card from "@/components/card";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/buku/search?q=${search}`
        );
        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <>
      <div className="h-screen my-5 mx-5">
        {books.length === 0 ? (
          <>
            <h1 className="text-lg ml-5 text-blue-900">
              Pencarian :
              <span className="font-bold italic">&quot;{search}&quot;</span>
            </h1>
            <div className="flex items-center justify-center h-[70vh]">
              <p className="text-lg  text-gray-400 italic">
                {search} tidak ditemukan
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-lg ml-5 text-blue-900">
              Hasil Pencarian :{" "}
              <span className="font-bold italic"> &quot;{search}&quot;</span>{" "}
              <p className="mt-1 w-[350px] border-b-2 border-gray-200"></p>
            </h1>
            <div className="flex gap-4 my-3">
              {books.map((product, index) => (
                <Link href={`/books/detail/${product.id}`} key={index}>
                  <Card
                    image={product.image}
                    title={product.judul}
                    publisher={product.penerbit}
                    price={product.harga}
                    stock={product.stok}
                    button={"Lihat Detail"}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
