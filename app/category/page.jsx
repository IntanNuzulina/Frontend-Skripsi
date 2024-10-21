import CardCategory from "@/components/card-category";
import Navbar from "@/components/navbar";
import Title from "@/components/title";
import axios from "axios";

export default async function Category() {
  let categories = null;
  try {
    categories = await axios.get("http://localhost:8000/api/kategori/view");
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <Navbar />
      <div className="mt-8 mx-8 border-b-2 pb-8">
        <label className="input input-bordered flex  items-center gap-2 w-[300px] h-10 my-5 m-auto ">
          <input
            type="text"
            className="grow text-sm"
            placeholder="Cari Kategori..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-50"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="flex gap-2 mt-3">
          {categories && (
            <>
              {categories.data.data.map((category, index) => (
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
    </>
  );
}
