import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store";
import { updateProfile, updatePassword } from "@/shared/services/api/userApi";
import type { UpdateProfilePayload } from "@/shared/services/api/userApi";

export function useProfile() {
  const { user, setUser, token } = useAuthStore();

  const profileMutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => {
      if (!user) throw new Error("Not authenticated");
      return updateProfile(user.id, payload);
    },
    onSuccess: (updated) => {
      // Keep token; only update the user object in the store
      setUser(updated, token);
    },
  });

  const passwordMutation = useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => {
      if (!user) throw new Error("Not authenticated");
      return updatePassword(user.id, currentPassword, newPassword);
    },
  });

  return {
    user,
    updateProfile: profileMutation.mutateAsync,
    isSavingProfile: profileMutation.isPending,
    profileSaved: profileMutation.isSuccess,
    profileError: profileMutation.error,

    updatePassword: passwordMutation.mutateAsync,
    isSavingPassword: passwordMutation.isPending,
    passwordSaved: passwordMutation.isSuccess,
    passwordError: passwordMutation.error,
  };
}
