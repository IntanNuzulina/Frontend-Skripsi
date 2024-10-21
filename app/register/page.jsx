import FormRegister from "./formRegister";
import Navbar from "@/components/navbar";
export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <FormRegister />
      </div>
    </>
  );
}
