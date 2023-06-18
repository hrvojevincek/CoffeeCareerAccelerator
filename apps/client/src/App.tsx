import { useEffect, useState } from 'react';
import './App.css';
import FeaturedJobs from './components/FeaturedJobs';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';

type JobData = {
  id: number;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  employerId: number;
  posted: boolean;
};

function App() {
  useEffect(() => {
    fetchData();
    // const dataIntervalID = setInterval(fetchData, 500)
    // return () => {
    //   clearInterval(dataIntervalID)
    // }
  }, []);

  const [data, setData] = useState<JobData[]>([]);

  const fetchData = async () => {
    await fetch('http://localhost:8080/jobs')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Navbar />
      <MainPage />
      <FeaturedJobs data={data} />
      <Footer />
    </>
  );
}

export default App;
