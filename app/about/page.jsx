import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="m-12 p-3 border-blue-900 border-2 rounded-badge bg-slate-300 hover:shadow-xl text-justify ">
        <h1 className="text-2xl font-semibold my-1 text-center">
          Tentang Kami
        </h1>
        <h2 className="font-bold">Al Hikmah</h2>
        Al Hikmah merupakan sebuah usaha yang bergerak di bidang perdagangan,
        khususnya dalam penjualan buku. Toko ini didirikan pada tahun 1983.
        <h2 className="mt-3 font-bold">Pengelola Al Hikmah</h2>
        Saat ini toko Al Hikmah dikelola oleh pak Muhammad Ridha dan sudah
        berusia 37 tahun. dalam operasional toko Al Hikmah, Pak Ridha dibantu
        oleh 3 karyawannya. Al Hikmah berhasil menarik perhatian dan kepercayaan
        pelanggan, beberapa faktor yang mempengaruhi hal tersebut adalah
        <div>1. Pelayanan Yang Ramah</div>
        <div>2. Harga Yang Terjangkau</div>
        Dengan Faktor-faktor tersebut toko Al Hikmah Memperoleh Tempat Istimewa
        di hati para Pelanggan.
        <h2 className="mt-3 font-bold">Tujuan</h2>
        Tujuan website ini adalah untuk memberikan informasi sekaligus kemudahan
        bagi pelanggan dalam membeli buku tanpa harus ke toko. Jika selama ini
        anda mengalami kendala dalam menemukan buku yang bagus dan harga yang
        rasional, maka toko kami siap memberikan solusi.
        <h2 className="mt-3 font-bold">Langkah Order Buku!</h2>
        <ul className="pl-4 list-disc">
          <li>
            Login terlebih dahulu menggunakan Username dan Password (jika belum
            memiliki akun boleh mendaftar terlebih dahulu sebelum Login)
          </li>
          <li>Setelah Login, anda akan diarahkan ke halaman produk</li>
          <li>Pilih produk yang ingin anda beli</li>
          <li>
            Klik tombol Lihat Detail. Anda akan diarahkan ke halaman detail
            produk.
          </li>
          <li>
            Klik tombol beli pada halaman detail produk. Anda akan diarahkan ke
            halaman pembayaran
          </li>
          <li>Selesaikan pembayaran</li>
          <li>Terakhir, Tunggu Buku tiba di rumah!</li>
        </ul>
      </div>

      <Footer />
    </>
  );
}
