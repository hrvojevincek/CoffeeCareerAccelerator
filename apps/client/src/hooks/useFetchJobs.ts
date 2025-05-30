import { useQuery } from '@tanstack/react-query';

import { jobsApi } from '../services/api';

import type { JobData } from '../types/types';

export function useFetchJobs() {
  return useQuery<JobData[]>({
    queryKey: ['jobs'],
    queryFn: jobsApi.getAll,
  });
}
