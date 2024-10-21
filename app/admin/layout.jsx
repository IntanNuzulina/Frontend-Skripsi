"use client";

import Loading from "@/components/loading";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutAdmin({ children }) {
  const { user, loading } = useAuth();
  const [render, setRender] = useState(true);

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
      <body>{loading || render ? <Loading /> : <>{children}</>}</body>
    </html>
  );
}
