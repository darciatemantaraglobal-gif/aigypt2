import { useGetMe, getGetMeQueryKey, useLogout, getGetProgressQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

export function useAuth() {
  const { data: user, isLoading, error } = useGetMe({
    query: { queryKey: getGetMeQueryKey(), retry: false },
  });

  const isAuthenticated = !!user && !error;
  const isAdminMode = !!(user as any)?.isAdminMode;

  return { user, isLoading, isAuthenticated, error, isAdminMode };
}

export function useLogoutAction() {
  const logout = useLogout();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout.mutateAsync();
    queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetProgressQueryKey() });
    setLocation("/");
  };

  return { handleLogout, isPending: logout.isPending };
}
