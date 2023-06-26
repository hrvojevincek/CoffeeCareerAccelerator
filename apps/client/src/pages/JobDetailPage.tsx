import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../components/Navbar';
import DetailWork from '../components/DetailWork';
import Footer from '../components/Footer';
import RelatedJobs from '../components/RelatedJobs';

function JobDetails() {
  const { id } = useParams();
  const [job, setJobs] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    await fetch(`http://localhost:8080/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="h-screen bg-cover bg-[url(https://perfectdailygrind.com/wp-content/uploads/2019/02/coffee-bar.jpg)]">
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar />
          <DetailWork data={job} />
          <RelatedJobs />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default JobDetails;
