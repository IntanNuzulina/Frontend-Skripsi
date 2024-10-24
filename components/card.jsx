import { IMAGE_URL } from "@/utils/config";

export default function Card(props) {
  console.log(props.diskon);
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Jika ingin tanpa desimal
    }).format(number);
  };
  return (
    <div className="card card-compact  rounded-tl-lg mx-4 bg-base-100 shadow-xl relatif w-[180px] my-3 transform transition-transform duration-300 hover:scale-95">
      {props.diskon && (
        <div className="absolute left-0 top-0 bg-red-500 px-3 py-1 text-white rounded-br-lg rounded-tl-lg ">
          {props.diskon}%
        </div>
      )}
      <figure>
        <img
          src={`${IMAGE_URL}/${props.image}`}
          alt="Buku"
          className="w-full h-[200px] mx-4 object-cover"
        />
      </figure>
      <div className=" h-[150px] justify-between border-1 border-red-500">
        <h2 className="text-center text-base font-bold my-3 text-gray-700">
          {props.title}
        </h2>
        <h4 className="my-0 ml-4 text-sm text-gray-800">{props.publisher}</h4>
        <h4 className="my-0 ml-4 text-base text-blue-900 font-bold">
          {formatRupiah(props.price)}{" "}
          <span className="text-sm text-gray-500 font-normal">/Buku</span>
        </h4>
        <h4 className="my-0 ml-4 text-sm text-gray-800">Stok: {props.stock}</h4>
      </div>

      <div className="card-actions justify-center mt-3">
        <button className="h-9 rounded-lg w-[110px] bg-red-500 hover:bg-red-600 text-white  mb-4 text-center text-sm">
          {props.button}
        </button>
      </div>
    </div>
  );
}
