import Image from "next/image";
import Link from "next/link";

export default function Card(props) {
  return (
    <div className="card card-compact  rounded-tl-lg mx-4 bg-base-100 shadow-xl relatif w-[180px] my-3 transform transition-transform duration-300 hover:scale-95">
      <div className="absolute left-0 top-0 bg-red-500 px-3 py-1 text-white rounded-br-lg rounded-tl-lg ">
        20%
      </div>
      <figure>
        <img
          src={props.image}
          alt="Buku"
          className="w-full h-[200px] mx-4 object-cover"
        />
      </figure>
      <div className=" h-[150px] justify-between border-1 border-red-500">
        <h2 className="text-center text-base font-bold my-3">{props.title}</h2>
        <h4 className="my-0 ml-4 text-sm">{props.publisher}</h4>
        <h4 className="my-0 ml-4 text-sm"> {props.price}</h4>
        <h4 className="my-0 ml-4 text-sm">Stok: {props.stock}</h4>
      </div>

      <div className="card-actions justify-center mt-3">
        <button className="h-9 rounded-xl w-[110px] bg-red-500 hover:bg-red-600 text-white  mb-4 text-center text-sm">
          {props.button}
        </button>
      </div>
    </div>
  );
}
