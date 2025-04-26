import { useEffect, useState } from 'react';
import FeaturedJobs from '../../components/FeaturedJobs';
import Hero from '../../components/Hero';
import { JobData } from '../../types/types';

const MainPage = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState<JobData[]>([]);

  const fetchData = async () => {
    await fetch('http://localhost:8080/jobs/')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(err => console.error('error in the catch', err));
  };

  console.log(data);

  return (
    <>
      <Hero />
      {data && <FeaturedJobs data={data} />}
    </>
  );
};

export default MainPage;
