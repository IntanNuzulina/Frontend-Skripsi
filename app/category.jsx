import CardCategory from "@/components/card-category";
import Title from "@/components/title";
import { BASE_URL } from "@/utils/config";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";
export default async function Category() {
  let categories = null;
  try {
    const res = await fetch(BASE_URL + "/kategori/view", {
      next: { revalidate: 60 },
      cache: "no-store",
    });
    const resJson = await res.json();
    categories = resJson;
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="mt-10 mx-8 border-b-2 pb-8">
      <Title name={"Category"} sub={"By Category"} />
      <div className="flex gap-2 mt-3">
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-3  gap-4 lg:gap-2">
          {categories && (
            <>
              {categories?.data?.map((category, index) => (
                <CardCategory
                  key={index}
                  color={
                    "bg-gradient-to-r from-blue-900 via-blue-900 to-red-400"
                  }
                  category={category}
                />
              ))}
            </>
          )}
        </div>
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
