import { useEffect, useState } from 'react';
import FeaturedJobs from '../components/FeaturedJobs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function JobsOne(props: LoggedInProp) {
  const { isLoggedIn } = props;

  const [data, setData] = useState<JobData[]>([]);

  const fetchData = async (category: string) => {
    const url = `http://localhost:8080/jobs`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="h-screen bg-right bg-fixed bg-[url('https://www.theradicalproject.com/wp-content/uploads/2023/04/00-coffee-roastery-landscape-image.jpg')] ">
        <Navbar />

        <div className="mt-10 rounded-lg bg-black mx-auto  md:max-w-4xl lg:max-w-6xl gap-10">
          <div className="mx-10 py-4 z-10 rounded-xl border-white">
            <h1 className=" dark:text-white text-2xl font-semibold">
              Filter Jobs
            </h1>
            <ul className=" flex flex-wrap pt-10 text-1xl text-center  dark:text-white">
              <li className="mr-2">
                <button
                  onClick={() => {
                    fetchData;
                  }}
                >
                  All
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto lg:max-w-7xl">
          <FeaturedJobs data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JobsOne;
