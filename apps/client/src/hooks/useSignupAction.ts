import { useMutation, useQueryClient } from '@tanstack/react-query';

import { USER_QUERY_KEY } from './useAuth';
import { SignupAction, type SignupActionResult } from '../actions/auth/signup.action';

import type { Inputs } from '../types/types';

/**
 * React hook for signup action
 * Thin wrapper around the business logic
 */
export const useSignupAction = () => {
  const queryClient = useQueryClient();

  return useMutation<SignupActionResult, SignupActionResult, Inputs>({
    mutationFn: async (userData: Inputs) => {
      return await SignupAction.execute({
        userData,
        onSuccess: user => {
          // Update React Query cache on successful signup
          queryClient.setQueryData(USER_QUERY_KEY, user);
        },
      });
    },
    onSuccess: result => {
      if (result.success && result.data) {
        queryClient.setQueryData(USER_QUERY_KEY, result.data);
      }
    },
  });
};
