import { useEffect, useState } from 'react';
import FeaturedJobs from '../components/FeaturedJobs';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const MainPage = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState<JobData[]>([]);

  const fetchData = async () => {
    await fetch('http://localhost:8080/jobs/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="">
      <Navbar />
      <Hero />
      <FeaturedJobs data={data} />
    </div>
  );
};

export default MainPage;
