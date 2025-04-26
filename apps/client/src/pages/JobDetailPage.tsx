import { useEffect, useState, useCallback } from 'react';

import { useParams } from 'react-router';

import DetailWork from '../components/DetailWork';
import Footer from '../components/Footer';
import RelatedJobs from '../components/RelatedJobs';
import { type JobData } from '../types/types';

function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobData | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:8080/jobs/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as JobData;
      setJob(data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="h-screen bg-cover bg-[url(https://perfectdailygrind.com/wp-content/uploads/2019/02/coffee-bar.jpg)]">
        <div className="min-h-screen flex flex-col justify-between">
          {job && <DetailWork data={job} />}
          <RelatedJobs />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default JobDetails;
