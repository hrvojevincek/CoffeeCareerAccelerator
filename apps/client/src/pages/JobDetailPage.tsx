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
    <div>
      <Navbar />
      <DetailWork data={job} />
      <RelatedJobs />
      <Footer />
    </div>
  );
}

export default JobDetails;
