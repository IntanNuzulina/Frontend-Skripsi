"use client";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { createRef, useContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { CartContext } from "@/context/cartContext";
import { BASE_URL } from "@/utils/config";
import Head from "next/head";

export default function Navbar() {
  const [activeSearch, setActiveSearch] = useState(false);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = createRef();
  const { cartCount, setCartCount } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      const fullName = user?.name;
      const nameParts = fullName?.split(" ");
      setFirst(nameParts[0].charAt(0));
      if (nameParts.length > 1) setSecond(nameParts[1].charAt(0));

      const getCartCount = async () => {
        try {
          const response = await axios.get(BASE_URL + "/keranjang/view", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
            },
          });

          setCartCount(response.data.data.length);
        } catch (error) {
          console.log(error);
          setCartCount(0);
        }
      };
      getCartCount();
    }
    setLoading(false);
  }, [user]);

  function searchFocus() {
    setActiveSearch(!activeSearch);
    if (!activeSearch) {
      inputRef.current.focus();
    }
  }

  const handleLogout = async () => {
    const response = await logout();
    response.status && router.push("/");
    if (response.status) {
      setCartCount(0);
      router.push("/");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Restora:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="navbar bg-white sticky top-0 z-50 shadow-sm shadow-white-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  href={"/"}
                  className="hover:border-b-red-500 hover:border-b active:bg-red-500 hover:bg-transparent"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link href={"/books"}>Buku</Link>
              </li>
              <li>
                <Link href={"/about"}>Tentang</Link>
              </li>
              <li>
                <Link href={"/contact"}>Kontak</Link>
              </li>
            </ul>
          </div>
          <Link href="/">
            <img
              src="/images/logoAH.png"
              alt="logo"
              className="w-12 lg:ml-3 mr-0"
            />
          </Link>
          <a
            className="ml-2 hidden md:block text-2xl font-extrabold tracking-wide"
            style={{
              fontFamily: "'Restora', serif",
              color: "#1533a1",
              textShadow: "3px 1px 1px rgba(203, 213, 225, 1)",
            }}
          >
            Al Hikmah
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href={"/"}
                className={`${
                  pathname === "/" ? "text-red-500 text-bold" : "text-black"
                } hover:border-b-red-500 hover:border-b-2  hover:bg-transparent active:bg-transparent rounded-none hover:text-red-500"`}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href={"/books"}
                className={`${
                  pathname === "/books"
                    ? "text-red-500 text-bold"
                    : "text-black"
                } hover:border-b-red-500 hover:border-b-2  hover:bg-transparent active:bg-transparent rounded-none hover:text-red-500"`}
              >
                Buku
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className={`${
                  pathname === "/about" ? "text-red-500" : "text-black"
                } hover:border-b-red-500 hover:border-b-2  hover:bg-transparent active:bg-transparent rounded-none hover:text-red-500"`}
              >
                Tentang
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className={`${
                  pathname === "/contact" ? "text-red-500 " : "text-black"
                } hover:border-b-red-500 hover:border-b-2  hover:bg-transparent active:bg-transparent rounded-none hover:text-red-500"`}
              >
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <form
            className="form-control me-3 relative h-10"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Cari..."
              className="input input-bordered w-24 md:w-auto"
              ref={inputRef}
              hidden={!activeSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => setActiveSearch(false)}
            />
            {activeSearch && (
              <FaSearch className="text-2xl absolute top-2 text-gray-300 right-2" />
            )}
          </form>
          <span onClick={searchFocus}>
            {!activeSearch ? (
              <FaSearch className="text-2xl text-blue-900 top-3 me-3" />
            ) : null}{" "}
          </span>

          <div className="relative me-3">
            <Link href={"/cart"}>
              <FaShoppingCart className="text-2xl me-1 text-blue-900 " />
            </Link>
            <span className="absolute -right-1  -top-1  bg-red-500 h-4 w-4  inline-flex items-center justify-center mt-0 text-white text-xs text-center  font-bold leading-none rounded-full ">
              {cartCount}
            </span>
          </div>

          {loading ? (
            <span className="loading loading-spinner loading-sm me-3"></span>
          ) : (
            <>
              {user ? (
                <div className="dropdown dropdown-end ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="w-9 h-9 btn-ghost btn-circle avatar bg-blue-900 hover:bg-blue-900 text-center font-semibold text-white me-3"
                  >
                    <div className="w-8 rounded-full">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-8 rounded-full">
                          <span className="text-md">{`${first}${second}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white"
                  >
                    <li>
                      <Link href="/account" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>

                    {user?.role === "admin" && (
                      <li>
                        <Link href="/admin">Dashboard</Link>
                      </li>
                    )}
                    <li onClick={handleLogout}>
                      <a className="hover:text-red-500">Logout</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  href={"/login"}
                  className="btn me-5 h-11 bg-blue-900 text-white hover:bg-blue-950"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
