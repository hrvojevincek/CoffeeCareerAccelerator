import { useEffect, useState } from 'react';

import FeaturedJobs from '../../components/FeaturedJobs';
import Footer from '../../components/Footer';
import { jobsApi } from '../../services/api';
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
    try {
      let fetchedData: JobData[];

      if (category === '') {
        fetchedData = await jobsApi.getAll();
      } else {
        fetchedData = await jobsApi.getByCategory(category);
      }

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
      <div className="min-h-screen overflow-auto bg-right bg-fixed bg-[url('https://images.squarespace-cdn.com/content/v1/65521fe39084f270bb13c228/1704576752170-OVJ1URPN05ZF9FY97H5P/00+coffee+roastery+landscape+image.jpg?format=1500w')] ">
        <div className="pt-20 pb-10">
          <div className="rounded-lg bg-black/80 mx-auto md:max-w-4xl lg:max-w-6xl">
            <div className="mx-10 py-4 rounded-xl">
              <h1 className="text-white text-2xl font-semibold">Filter Jobs</h1>
              <div className="flex flex-wrap gap-2 items-center mt-2">
                <button
                  key="all-button"
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
                    key={`category-${category}`}
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

        <div className="container mx-auto px-4 lg:max-w-6xl mb-10">
          <FeaturedJobs jobs={data} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Jobs;
