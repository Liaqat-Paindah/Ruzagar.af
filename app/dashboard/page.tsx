'use client';
import { useAuth } from "@/components/provider/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Dashboard() {
  const { isAuthenticated, user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !user)) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router, user]);

  if (loading || !isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  return <div>Dashboard {profile?.first_name }-{ user.email}</div>;
}
