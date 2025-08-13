import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import DetailWork from '../components/DetailWork';
import RelatedJobs from '../components/RelatedJobs';
import { jobsApi } from '../services/api';
import { type JobData } from '../types/types';

function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (!id) {
      setError('Job ID is missing');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await jobsApi.getById(Number(id));
      setJob(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching job details:', err);
      setError('Failed to load job details. Please try again later.');
      // Optionally redirect back to jobs page after a delay
      setTimeout(() => {
        navigate('/jobs');
      }, 3000);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading job details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-cover bg-[url(https://perfectdailygrind.com/wp-content/uploads/2019/02/coffee-bar.jpg)]">
        <div className="min-h-screen flex flex-col justify-between">
          {job && <DetailWork data={job} />}
          <RelatedJobs />
        </div>
      </div>
    </>
  );
}

export default JobDetails;
