import { useGetMe, getGetMeQueryKey, useLogout, getGetProgressQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

export function useAuth() {
  const { data: user, isLoading, error } = useGetMe({
    query: { queryKey: getGetMeQueryKey(), retry: false },
  });

  const isAuthenticated = !!user && !error;

  return { user, isLoading, isAuthenticated, error };
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
