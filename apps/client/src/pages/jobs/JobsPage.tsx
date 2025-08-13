import { useEffect, useMemo, useState } from 'react';

import { default as moment } from 'moment';

import FeaturedJobs from '../../components/FeaturedJobs';
import Footer from '../../components/Footer';
import JobsFilters from '../../components/Jobs/JobsFilters';
import { jobsApi } from '../../services/api';
import { type JobData } from '../../types/types';
import dummyJobs from '../../utils/db/dummyJobs';

function Jobs() {
  const [allJobs, setAllJobs] = useState<JobData[]>(dummyJobs);
  const [data, setData] = useState<JobData[]>(dummyJobs);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedEmployer, setSelectedEmployer] = useState<string>('All');
  const [postedRange, setPostedRange] = useState<'24h' | '7d' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const run = async () => {
      try {
        const fetched = await jobsApi.getAll();
        setAllJobs(fetched.length ? fetched : dummyJobs);
      } catch {
        setAllJobs(dummyJobs);
      }
    };
    void run();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(allJobs.map(j => j.category))).filter(Boolean),
    [allJobs]
  );
  const locations = useMemo(
    () => Array.from(new Set(allJobs.map(j => j.location))).filter(Boolean),
    [allJobs]
  );
  const employers = useMemo(
    () => Array.from(new Set(allJobs.map(j => j.employer?.name || 'Company'))).filter(Boolean),
    [allJobs]
  );

  const clearAll = () => {
    setActiveCategory('All');
    setSelectedLocation('All');
    setSelectedEmployer('All');
    setPostedRange('all');
    setSearchQuery('');
  };

  useEffect(() => {
    const filtered = allJobs.filter(job => {
      if (activeCategory !== 'All' && job.category !== activeCategory) return false;
      if (selectedLocation !== 'All' && job.location !== selectedLocation) return false;
      if (selectedEmployer !== 'All' && (job.employer?.name || 'Company') !== selectedEmployer)
        return false;
      if (postedRange !== 'all') {
        const hours = moment().diff(moment(job.createdAt), 'hours');
        if (postedRange === '24h' && hours > 24) return false;
        if (postedRange === '7d' && hours > 24 * 7) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const haystack =
          `${job.title} ${job.description} ${job.location} ${job.category} ${job.employer?.name ?? ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    setData(filtered);
  }, [allJobs, activeCategory, selectedLocation, selectedEmployer, postedRange, searchQuery]);

  return (
    <>
      <div className="relative min-h-screen bg-no-repeat bg-cover bg-center bg-[url('https://images.squarespace-cdn.com/content/v1/65521fe39084f270bb13c228/1704576752170-OVJ1URPN05ZF9FY97H5P/00+coffee+roastery+landscape+image.jpg?format=1500w')]">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative pt-20 pb-10">
          <div className="container mx-auto px-4 lg:max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-12">
              <aside className="lg:col-span-4 order-1 lg:sticky lg:top-24 lg:self-start">
                <JobsFilters
                  categories={categories}
                  locations={locations}
                  employers={employers}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  selectedEmployer={selectedEmployer}
                  setSelectedEmployer={setSelectedEmployer}
                  postedRange={postedRange}
                  setPostedRange={setPostedRange}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  clearAll={clearAll}
                />
              </aside>
              <main className="lg:col-span-8 order-2">
                <div className="bg-transparent">
                  <FeaturedJobs jobs={data} />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Jobs;
