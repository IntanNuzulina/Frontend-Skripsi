import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { FaBookReader, FaWhatsapp } from "react-icons/fa";

export default function Page() {
  const nomorWhatsapp = "085277333471";

  return (
    <div>
      <Navbar />
      <div className="h-screen lg:h-[500px] flex justify-center items-center">
        <div className="border-2 border-blue-900 w-[600px] h-96 my-3 mx-5 rounded-2xl bg-slate-300 shadow-md flex relative">
          <div className="mx-auto my-auto">
            <FaBookReader className="text-8xl mx-auto text-blue-900" />
            <p className="text-blue-900 text-lg font-italic mt-2">
              Klik Link WA Berikut Jika Ingin Berkonsultasi dengan Admin
            </p>
          </div>

          <div className="absolute bottom-2 right-[-20px]">
            <Link
              href={`https://wa.me/${nomorWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-[50px] text-green-600 cursor-pointer bg-[#56f691] p-2 rounded-full" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
