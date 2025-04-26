import { useMutation, useQuery } from '@tanstack/react-query';

import { authApi } from '../services/api';
import { queryClient } from '../services/queryClient';

import type { User } from '../types/types';

// Define response types to match API returns
type LoginResponse = User;
type SignupResponse = User;
type LogoutResponse = { success: boolean };

export function useMe() {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: authApi.getMe,
    retry: false,
  });
}

export function useLogin() {
  return useMutation<LoginResponse, Error, { username: string; password: string }>({
    mutationFn: ({ username, password }) => authApi.login(username, password),
    onSuccess: () => {
      // Invalidate the me query to refetch user data
      void queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

export function useSignup() {
  return useMutation<SignupResponse, Error, Record<string, unknown>>({
    mutationFn: userData => authApi.signup(userData),
  });
}

export function useLogout() {
  return useMutation<LogoutResponse, Error, void>({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear user data from cache
      void queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}
