import CardCategory from "@/components/card-category";
import Navbar from "@/components/navbar";
import { BASE_URL } from "@/utils/config";

export default async function Category() {
  let categories = null;
  try {
    const res = await fetch(BASE_URL + "/kategori/view", {
      next: { revalidate: 0 },
    });
    const resJson = await res.json();
    categories = resJson;
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <Navbar />
      <div className="mt-6 mx-8 border-b-2 pb-8">
        <div className="flex items-center justify-center my-4">
          <hr className="w-1/3 border-t-2 border-blue-900" />
          <p className="mx-4 text-center text-blue-900 font-semibold text-lg md:text-xl lg:text-xl">
            Semua Kategori
          </p>
          <hr className="w-1/3 border-t-2 border-blue-900" />
        </div>
        <div className="mt-5 mx-auto">
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2  gap-4 lg:gap-2">
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
      </div>
    </>
  );
}
