import { FaBookReader } from "react-icons/fa";
import FormRegister from "./formRegister";
import Navbar from "@/components/navbar";
export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        {/* <div className="border-2 w-[800px] h-auto py-5  my-5 rounded-2xl bg-blue-900 flex justify-around items-center">
          <div>
            <FaBookReader className="text-9xl mx-auto text-white" />
          </div> */}
        <FormRegister />
      </div>
    </>
  );
}
