import { useQuery } from '@tanstack/react-query';

import { jobsApi } from '../services/api';

import type { JobData } from '../types/types';

export function useJobs() {
  return useQuery<JobData[]>({
    queryKey: ['jobs'],
    queryFn: jobsApi.getAll,
  });
}

export function useJobById(id: number) {
  return useQuery<JobData>({
    queryKey: ['job', id],
    queryFn: () => jobsApi.getById(id),
    enabled: !!id,
  });
}

export function useJobsByCategory(category: string) {
  return useQuery<JobData[]>({
    queryKey: ['jobs', 'category', category],
    queryFn: () => jobsApi.getByCategory(category),
    enabled: !!category,
  });
}
