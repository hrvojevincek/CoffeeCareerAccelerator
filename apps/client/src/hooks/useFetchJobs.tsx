import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { JobData } from '../types/types';

const fetchJobs = async (): Promise<JobData[]> => {
  const response = await axios.get<JobData[]>('http://localhost:8080/jobs/');
  return response.data;
};

export function useFetchJobs() {
  return useQuery<JobData[]>({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
}
