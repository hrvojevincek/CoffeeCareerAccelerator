import FeaturedJobs from '../../components/FeaturedJobs';
import Hero from '../../components/Hero';
import { useJobs } from '../../hooks/useJobs';

const MainPage = () => {
  const { data, isLoading, error } = useJobs();

  if (isLoading) {
    return <div className="text-center p-8">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error loading jobs</div>;
  }

  return (
    <>
      <Hero />
      {data && <FeaturedJobs jobs={data} />}
    </>
  );
};

export default MainPage;
