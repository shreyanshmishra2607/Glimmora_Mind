import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getConversation,
  sendMessage,
  DEFAULT_CONVERSATION_ID,
} from "@/shared/services/api/chatApi";
import { useAuthStore } from "@/shared/store";

export function useChat(conversationId: string = DEFAULT_CONVERSATION_ID) {
  const userId = useAuthStore((s) => s.user?.id);
  const query = useQuery({
    queryKey: ["chat", conversationId, userId],
    queryFn: () => getConversation(conversationId, userId!),
    enabled: !!userId,
  });
  return {
    conversation: query.data ?? null,
    messages: query.data?.messages ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useSendMessage(conversationId: string = DEFAULT_CONVERSATION_ID) {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);
  const mutation = useMutation({
    mutationFn: (content: string) =>
      sendMessage(conversationId, userId!, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", conversationId] });
    },
  });
  return {
    sendMessage: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
