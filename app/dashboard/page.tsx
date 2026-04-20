'use client';
import { useAuth } from "@/components/provider/authContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function Dashboard() {
  const { isAuthenticated, user, profile } = useAuth();
  const router = useRouter();
  if (!isAuthenticated || !user || !profile) {
    router.push("/login");
  }
  return <div>Dashboard {profile.first_name}</div>;
}
