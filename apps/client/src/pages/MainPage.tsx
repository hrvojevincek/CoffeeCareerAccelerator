import { useEffect, useState } from 'react';
import FeaturedJobs from '../components/FeaturedJobs';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { JobData } from '../types';

const MainPage = () => {
  useEffect(() => {
    fetchData();
    // const dataIntervalID = setInterval(fetchData, 500)
    // return () => {
    //   clearInterval(dataIntervalID)
    // }
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
    <div className="format">
      <Hero />
      <FeaturedJobs data={data} />
      <Footer />
    </div>
  );
};

export default MainPage;
