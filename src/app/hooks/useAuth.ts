"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "@/app/lib/auth";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function login(email: string, password: string) {
    try {
      setIsLoading(true);
      setError("");
      const { token } = await signIn(email, password);
      localStorage.setItem("token", token);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Error desconocido en login");
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    signOut(); 
    localStorage.removeItem("token");
    router.push("/login");
  }

  return {
    login,
    logout,
    isLoading,
    error,
  };
}
