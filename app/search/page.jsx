import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SearchPage from "./search";
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div>
      <Navbar />
      <SearchPage />
      <Footer />
    </div>
  );
}
