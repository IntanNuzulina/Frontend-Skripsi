import CardCategory from "@/components/card-category";
import Title from "@/components/title";
import axios from "axios";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";
export default async function Category() {
  let categories = null;
  try {
    categories = await axios.get("http://localhost:8000/api/kategori/view");
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="mt-10 mx-8 border-b-2 pb-8">
      <Title name={"Category"} sub={"By Category"} />
      <div className="flex gap-2 mt-3">
        {categories && (
          <>
            {categories.data.data.map((category, index) => (
              <CardCategory
                key={index}
                color={"bg-gradient-to-r from-blue-900 via-blue-900 to-red-400"}
                category={category}
              />
            ))}
          </>
        )}
      </div>
      <div className="mt-5 text-right">
        <Link href="/category">
          <button className=" hover:text-blue-900 cursor-pointer italic text-base hover:font-semibold">
            Lihat semua kategori{" "}
            <FaAnglesRight className="inline text-italic text-sm italic my-1" />
          </button>
        </Link>
      </div>
    </div>
  );
}
