import { useQuery } from '@tanstack/react-query';

import { userApi } from '../services/api';

import type { UserData } from '../types/types';

export function useUserById(id: number) {
  return useQuery<UserData>({
    queryKey: ['user', id],
    queryFn: () => userApi.getById(id),
    enabled: !!id,
  });
}
