import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../services/api';

import type { Inputs, User } from '../types/types.d';

// Key for the user data in React Query cache
export const USER_QUERY_KEY = ['user'];

// Hook to fetch the current user
export const useMe = () => {
  return useQuery<User | null>({
    queryKey: USER_QUERY_KEY,
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook to login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: { username: string; password: string }) => authApi.login(credentials),
    onSuccess: userData => {
      queryClient.setQueryData(USER_QUERY_KEY, userData);
    },
  });
};

// Hook to signup
export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Inputs) => authApi.signup(userData),
    onSuccess: userData => {
      queryClient.setQueryData(USER_QUERY_KEY, userData);
    },
  });
};

// Hook to logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(USER_QUERY_KEY, null);
      void queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
};
