"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SwalTopEnd } from "@/components/MySwal";

export default function FormRegister() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [error, setError] = useState([]);

  const { register } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        name,
        username,
        email,
        noHp,
        password,
        repassword,
        alamat,
      });

      if (response?.status === "success") {
        SwalTopEnd({
          title: "Success!",
          icon: "success",
          text: "Register Berhasil!",
        });
        router.push("/login");
      }
    } catch (error) {
      console.log(error.response.data.errors);
      setError(error?.response?.data?.errors);
      SwalTopEnd({
        title: "Error!",
        icon: "error",
        text: error?.response?.data?.message,
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepassword = () => {
    setShowRepassword(!showRepassword);
  };
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:p-14 p-5">
      <div className="lg:w-1/2 w-full text-center mb-5 lg:mb-0">
        {/* Gambar daftar */}
        <img
          src="/images/daftar.png"
          alt="login"
          className="mx-auto w-[430px] lg:w-[650px] lg:h-[600px] lg:rounded-l-lg lg:shadow-lg"
        />
      </div>

      <div className="lg:w-[500px] lg:h-[600px] w-full flex">
        <form
          className="w-full max-w-md bg-white py-16 lg:px-14 rounded-r-lg shadow-lg justify-center px-8"
          onSubmit={handleSubmit}
        >
          {/* Nama Lengkap */}
          <label className="input input-bordered flex items-center gap-2 mb-4 mt-1 bg-white h-10 text-sm relative">
            <input
              type="text"
              className="grow text-sm"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-50 absolute right-4"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </label>
          {error.name && <p className="text-red-500">{error.name}</p>}
          {/* Username */}
          <label className="input input-bordered flex items-center gap-2 mb-4 mt-1 bg-white h-10 text-sm relative">
            <input
              type="text"
              className="grow text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-50 absolute right-4"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </label>
          {error.username && <p className="text-red-500">{error.username}</p>}
          {/* Email */}
          <label className="input input-bordered flex items-center gap-2 mb-4 mt-1 bg-white h-10 text-sm relative">
            <input
              type="email"
              className="grow text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-50 absolute right-4"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
          </label>
          {error.email && <p className="text-red-500">{error.email}</p>}
          <label className="input input-bordered flex items-center gap-2 mb-4 mt-1 bg-white h-10 text-sm relative">
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.25 3.25a9 9 0 01-12.5 0M19 12a9 9 0 00-16.77 0M12 15a3 3 0 00-3-3M19 12a9 9 0 00-16.77 0"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9.75a3 3 0 100 6 3 3 0 000-6zm-9 3.25a9 9 0 0112.77-7.25M12 9.75a3 3 0 000 6M12 9.75a3 3 0 110 6M4.23 7.23A9 9 0 0115 12.75"
                  />
                </svg>
              )}
            </button>
          </label>
          {error.password && <p className="text-red-500">{error.password}</p>}

          <label className="input input-bordered flex items-center gap-2 mb-4 mt-1 bg-white h-10 text-sm relative">
            <input
              type={showRepassword ? "text" : "password"}
              className="grow text-sm"
              placeholder="Konfirmasi Password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleShowRepassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showRepassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.25 3.25a9 9 0 01-12.5 0M19 12a9 9 0 00-16.77 0M12 15a3 3 0 00-3-3M19 12a9 9 0 00-16.77 0"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9.75a3 3 0 100 6 3 3 0 000-6zm-9 3.25a9 9 0 0112.77-7.25M12 9.75a3 3 0 000 6M12 9.75a3 3 0 110 6M4.23 7.23A9 9 0 0115 12.75"
                  />
                </svg>
              )}
            </button>
          </label>
          {error.repassword && (
            <p className="text-red-500">{error.repassword}</p>
          )}
          {/* No Hp */}
          <label className="input input-bordered flex items-center gap-2 mb-4 mt-1 bg-white h-10 text-sm relative">
            <input
              type="text"
              className="grow text-sm"
              placeholder="No Hp"
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-50 absolute right-4"
            >
              <path d="M11.004 9.804a1 1 0 0 1 1.366-.366l1.785 1.03c.536.31.866.896.837 1.52-.11 2.291-1.993 3.858-4.285 3.078-2.99-.94-5.78-3.73-6.72-6.72-.78-2.292.787-4.175 3.078-4.285a1.749 1.749 0 0 1 1.52.837l1.03 1.785a1 1 0 0 1-.366 1.366L8.89 8.89a.25.25 0 0 0-.104.276c.194.777.812 1.395 1.59 1.59a.25.25 0 0 0 .276-.104l.352-.352Z" />
            </svg>
          </label>
          {error.no_hp && <p className="text-red-500">{error.no_hp}</p>}
          {/* Alamat */}
          <label className="input input-bordered flex items-center gap-2 mb-4 mt-1 bg-white h-10 text-sm relative">
            <input
              type="text"
              className="grow text-sm"
              placeholder="Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-50 absolute right-4"
            >
              <path d="M8 0a5 5 0 0 1 5 5c0 2.281-2.053 4.603-4.261 6.322A.723.723 0 0 1 8 12.5a.723.723 0 0 1-.739-.178C5.053 9.603 3 7.281 3 5a5 5 0 0 1 5-5Zm0 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
          </label>
          {error.alamat && <p className="text-red-500">{error.alamat}</p>}
          <div className="text-center">
            <button className="lg:w-full w-full h-9 mt-2 rounded-xl text-sm text-white bg-blue-900 hover:bg-blue-700">
              Daftar
            </button>
            <p className="text-sm my-2 text-gray-600">
              Sudah Punya Akun?{" "}
              <Link
                href={"/login"}
                className="text-blue-900 font-bold hover:underline hover:italic"
              >
                LOGIN
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
