"use client";

import { FaBookReader } from "react-icons/fa";
import LoginForm from "./login-form";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
export default function Page() {
  const { user, loading } = useAuth();
  const [render, setRender] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/");
      } else {
        setRender(false);
      }
    }
  }, [user, loading]);
  return (
    <>
      {loading || render ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <LoginForm />
          </div>
        </>
      )}
    </>
  );
}
