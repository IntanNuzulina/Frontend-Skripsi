"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SwalTopEnd } from "@/components/MySwal";
import styles from "./styles.module.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);
      if (response.status === "success") {
        SwalTopEnd({
          title: "Success!",
          icon: "success",
          text: "Login Berhasil!",
        });
        response.user.role === "admin"
          ? router.push("/admin")
          : router.push("/");
      }
    } catch (error) {
      SwalTopEnd({
        title: "Error!",
        icon: "error",
        text: "Username atau Password salah!",
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:p-20 p-5">
      {/* Gambar di sebelah kiri (atau di atas pada layar kecil) */}
      <div className="lg:w-1/2 w-full text-center mb-5 lg:mb-0">
        {/* Gambar buku */}
        <img
          src="/images/login.png"
          alt="login"
          className="mx-auto w-[430px] lg:w-[380px] lg:h-[350px] lg:rounded-l-lg lg:shadow-lg"
        />
      </div>

      {/* Form login di sebelah kanan (atau di bawah pada layar kecil) */}
      <div className="lg:w-[400px] lg:h-[350px] w-full flex">
        <form
          className="w-full max-w-md bg-white p-14 rounded-r-lg shadow-lg justify-center mx-auto"
          onSubmit={handleSubmit}
        >
          {/* Username Input */}
          <label className="label-text mt-2 ml-1 font-bold text-gray-700 text-base">
            Username
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3 mt-1 bg-white h-10 text-sm">
            <input
              type="text"
              className="grow"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </label>

          {/* Password Input */}
          <label className="label-text mt-2 ml-1 font-bold text-gray-700 text-base">
            Password
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-2 mt-1 bg-white h-10 text-sm relative">
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

          {/* Button and Register Link */}
          <div className="text-center">
            <button className="lg:w-full w-full h-9 mt-3 rounded-xl text-sm text-white bg-blue-900 hover:bg-blue-700">
              Login
            </button>
            <p className="text-sm my-2 text-gray-600">
              Belum Punya Akun?{" "}
              <Link
                href={"/register"}
                className="text-blue-900 font-bold hover:underline hover:italic"
              >
                DAFTAR
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
