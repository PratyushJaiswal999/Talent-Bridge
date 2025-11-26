import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

// Helper: get a token or throw so onError handler receives a proper error
const ensureToken = async (getToken) => {
  const token = await getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  return token;
};

export const useCreateSession = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: async (payload) => {
      const token = await ensureToken(getToken);
      return sessionApi.createSession(payload, token);
    },
    onSuccess: () => {
      toast.success("Session created successfully!");
      // refresh active + recent sessions after creating one
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to create room");
    },
  });
};

export const useActiveSessions = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: async () => {
      const token = await ensureToken(getToken);
      return sessionApi.getActiveSessions(token);
    },
  });
};

export const useMyRecentSessions = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: async () => {
      const token = await ensureToken(getToken);
      return sessionApi.getMyRecentSessions(token);
    },
  });
};

export const useSessionById = (id) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["session", id],
    enabled: !!id,
    refetchInterval: 5000, // refetch every 5 seconds to detect session status changes
    queryFn: async () => {
      const token = await ensureToken(getToken);
      return sessionApi.getSessionById(id, token);
    },
  });
};

export const useJoinSession = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: async (id) => {
      const token = await ensureToken(getToken);
      return sessionApi.joinSession(id, token);
    },
    onSuccess: () => {
      toast.success("Joined session successfully!");
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to join session");
    },
  });
};

export const useEndSession = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: async (id) => {
      const token = await ensureToken(getToken);
      return sessionApi.endSession(id, token);
    },
    onSuccess: () => {
      toast.success("Session ended successfully!");
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to end session");
    },
  });
};
