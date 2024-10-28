import { IMAGE_URL } from "@/utils/config";

export default function Card({ product, button }) {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Jika ingin tanpa desimal
    }).format(number);
  };
  return (
    <div className="card card-compact  rounded-tl-lg lg:mx-4 bg-base-100 shadow-xl relatif lg:w-[180px] w-[150px] my-2 transform transition-transform duration-300 hover:scale-95 mx-3">
      {new Date(product?.flashsale?.tanggal_akhir) >= new Date() && (
        <div className="absolute left-0 top-0 bg-red-500 px-3 py-2 text-white rounded-br-lg rounded-tl-lg ">
          {product?.flashsale?.diskon}%
        </div>
      )}
      <figure>
        <img
          src={`${IMAGE_URL}/${product?.image}`}
          alt="Buku"
          className="w-full h-[200px] mx-4 object-cover"
        />
      </figure>
      <div className=" h-[150px] justify-between border-1 border-red-500">
        <h2 className="text-center text-base font-bold my-3 text-gray-700">
          {product?.judul}
        </h2>
        <h4 className="my-0 ml-4 text-sm text-gray-800">{product?.penerbit}</h4>
        <h4 className="my-0 ml-4 text-base text-blue-900 font-bold">
          {formatRupiah(product?.harga)}{" "}
          <span className="text-sm text-gray-500 font-normal">/Buku</span>
        </h4>
        <h4 className="my-0 ml-4 text-sm text-gray-800">
          Stok: {product?.stok}
        </h4>
      </div>

      <div className="card-actions justify-center mt-3">
        <button className="h-9 rounded-lg w-[110px] bg-red-500 hover:bg-red-600 text-white  mb-4 text-center text-sm">
          {button}
        </button>
      </div>
    </div>
  );
}
