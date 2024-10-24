"use client";

import Loading from "@/components/loading";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

export default function LayoutAdmin({ children }) {
  const { user, loading } = useAuth();
  const [render, setRender] = useState(true);
  const [open, setOpen] = useState(true);

  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!user || user?.role !== "admin") {
        router.push("/");
      } else {
        setRender(false);
      }
    }
  }, [user, loading]);
  return (
    <html lang="en">
      <body>
        {loading || render ? (
          <Loading />
        ) : (
          <>
            <Sidebar open={open} setOpen={setOpen} />
            <div
              className={`${
                open ? "ml-[284px]" : "ml-[80px]"
              } transition-all duration-500`}
            >
              {children}
            </div>
          </>
        )}
      </body>
    </html>
  );
}
