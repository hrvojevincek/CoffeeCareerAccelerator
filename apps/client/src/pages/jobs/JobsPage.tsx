import { useEffect, useState } from 'react';
import FeaturedJobs from '../../components/FeaturedJobs';
import Footer from '../../components/Footer';
import { JobData } from '../../types/types';
import dummyJobs from '../../utils/db/dummyJobs';

function Jobs() {
  //check if cookies have the token

  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<JobData[]>(dummyJobs);

  const fetchData = async (category: string) => {
    const url =
      category === ''
        ? `http://localhost:8080/jobs/`
        : `http://localhost:8080/jobs/categories/${category}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);

      if (category === '') {
        setCategories(data.map((job: any) => job.categories));
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setData(dummyJobs);
    }
  };

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <div className="h-screen overflow-auto bg-right bg-fixed bg-[url('https://images.squarespace-cdn.com/content/v1/65521fe39084f270bb13c228/1704576752170-OVJ1URPN05ZF9FY97H5P/00+coffee+roastery+landscape+image.jpg?format=1500w')] ">
        <div className="pt-20 pb-10">
          <div className="rounded-lg bg-black mx-auto  md:max-w-4xl lg:max-w-6xl gap-10">
            <div className="mx-10 py-4 z-10 rounded-xl border-white">
              <h1 className=" dark:text-white text-2xl font-semibold">Filter Jobs</h1>
              <ul className=" flex flex-wrap pt-10 text-1xl text-center  dark:text-white">
                <li className="mr-2">
                  <a
                    className={`${
                      '' === selectedCategory ? '' : 'font-bold text-neutral-50'
                    } cursor-pointer border-transparent rounded-t-lg hover:text-gray-100 hover:border-gray-300 dark:hover:text-gray-300`}
                    onClick={() => setSelectedCategory('')}
                  >
                    All
                  </a>
                </li>

                {categories.map((category, i) => (
                  <li key={i} className="mr-2">
                    <a
                      className={`${
                        category === selectedCategory ? 'font-bold text-neutral-50' : ''
                      } cursor-pointer border-transparent rounded-t-lg hover:text-gray-50 hover:border-gray-300 dark:hover:text-gray-100`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto lg:max-w-7xl overflow-auto">
          <FeaturedJobs data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Jobs;
