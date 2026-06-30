import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const API_BASE = () => (import.meta.env.VITE_API_URL ?? "/api") as string;

export function useAdminAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    fetch(`${API_BASE()}/admin/verify`, { credentials: "include" })
      .then(r => {
        if (r.ok) { setIsAdmin(true); }
        else { setLocation("/admin/login"); }
      })
      .catch(() => setLocation("/admin/login"))
      .finally(() => setIsLoading(false));
  }, [setLocation]);

  return { isLoading, isAdmin };
}

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(`${API_BASE()}${path}`, {
    credentials: "include",
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }
  return res;
}
