"use client";

import { useEffect } from "react";
import { useAuth } from "./auth-context";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !accessToken) {
      router.replace("/login");
    }
  }, [isAuthLoading, accessToken, router]);

  if (isAuthLoading) return null;

  return accessToken ? children : null;
}
