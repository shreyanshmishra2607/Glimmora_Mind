import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store";
import * as authApi from "@/shared/services/api/authApi";
import type { LoginCredentials, SignupCredentials } from "@/shared/services/api/authApi";

export function useAuth() {
  const { user, token, setUser, logout: storeLogout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: ({ user: u, token: t }) => setUser(u, t),
  });

  const signupMutation = useMutation({
    mutationFn: (credentials: SignupCredentials) => authApi.signup(credentials),
    onSuccess: ({ user: u, token: t }) => setUser(u, t),
  });

  const googleMutation = useMutation({
    mutationFn: () => authApi.loginWithGoogle(),
    onSuccess: ({ user: u, token: t }) => setUser(u, t),
  });

  function logout() {
    authApi.logout().finally(storeLogout);
  }

  const isAuthenticated = !!user && !!token;

  return {
    user,
    token,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    loginWithGoogle: googleMutation.mutateAsync,
    logout,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
    isGooglePending: googleMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
    googleError: googleMutation.error,
  };
}
