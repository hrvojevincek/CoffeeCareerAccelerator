import { useEffect, useState } from 'react';

import FeaturedJobs from '../../components/FeaturedJobs';
import Footer from '../../components/Footer';
import { type JobData } from '../../types/types';
import dummyJobs from '../../utils/db/dummyJobs';

function Jobs() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<JobData[]>(dummyJobs);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    setSelectedCategory(category === 'All' ? '' : category);
  };

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
      const fetchedData = (await response.json()) as JobData[];
      setData(fetchedData);

      if (category === '') {
        // Extract unique categories from job data
        const uniqueCategories = [...new Set(fetchedData.map((job: JobData) => job.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setData(dummyJobs);
    }
  };

  useEffect(() => {
    void fetchData(selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <div className="h-screen overflow-auto bg-right bg-fixed bg-[url('https://images.squarespace-cdn.com/content/v1/65521fe39084f270bb13c228/1704576752170-OVJ1URPN05ZF9FY97H5P/00+coffee+roastery+landscape+image.jpg?format=1500w')] ">
        <div className="pt-20 pb-10">
          <div className="rounded-lg bg-black mx-auto  md:max-w-4xl lg:max-w-6xl gap-10">
            <div className="mx-10 py-4 z-10 rounded-xl border-white">
              <h1 className="dark:text-white text-2xl font-semibold">Filter Jobs</h1>
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => handleCategoryFilter('All')}
                  className={`w-fit px-3 py-1 rounded-full text-xs ${
                    activeCategory === 'All'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                  All
                </button>

                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryFilter(category)}
                    className={`w-fit px-3 py-1 rounded-full text-xs ${
                      activeCategory === category
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto lg:max-w-7xl overflow-auto">
          <FeaturedJobs jobs={data} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Jobs;
