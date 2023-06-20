import { useEffect, useState } from 'react';
import FeaturedJobs from '../components/FeaturedJobs';
import Navbar from '../components/Navbar';
import { JobData } from '../types';

function Jobs() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<JobData[]>([]);

  const fetchData = async (category: string) => {
    const url =
      category === ''
        ? `http://localhost:8080/jobs/`
        : `http://localhost:8080/jobs/categories/${category}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        if (category === '') {
          setCategories(data.map((job: any) => job.categories));
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="dark:bg-gray-900 ">
      <Navbar />
      <div className="m-5 mx-auto max-w-4xl gap-10 justify-center">
        <div className="z-10 rounded-xl border-2 border-white">
          <h1 className="m-5 dark:text-white text-2xl font-semibold whitespace-nowrap">
            Filter Jobs
          </h1>
          <ul className="px-5 pb-4 flex flex-wrap text-1xl text-center border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <li className="mr-2">
              <a
                className={`${
                  '' === selectedCategory ? '' : 'font-bold text-neutral-50'
                } cursor-pointer border-transparent rounded-t-lg hover:text-gray-50 hover:border-gray-300 dark:hover:text-gray-300`}
                onClick={() => setSelectedCategory('')}
              >
                All
              </a>
            </li>

            {categories.map((category, i) => (
              <li key={i} className="mr-2">
                <a
                  className={`${
                    category === selectedCategory
                      ? 'font-bold text-neutral-50'
                      : ''
                  } cursor-pointer border-transparent rounded-t-lg hover:text-gray-50 hover:border-gray-300 dark:hover:text-white`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <FeaturedJobs data={data} />
        </div>
      </div>
    </div>
  );
}

export default Jobs;
