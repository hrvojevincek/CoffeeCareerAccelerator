import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchJobs = async () => {
  const response = await axios.get('http://localhost:8080/jobs/');
  return response.data;
};

export function useFetchJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
}
