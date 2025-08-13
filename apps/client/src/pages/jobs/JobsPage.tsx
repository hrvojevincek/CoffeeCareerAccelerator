import { useEffect, useMemo, useState } from 'react';

import { default as moment } from 'moment';

import FeaturedJobs from '../../components/FeaturedJobs';
import Footer from '../../components/Footer';
import { jobsApi } from '../../services/api';
import { type JobData } from '../../types/types';
import dummyJobs from '../../utils/db/dummyJobs';

function Jobs() {
  const [allJobs, setAllJobs] = useState<JobData[]>(dummyJobs);
  const [data, setData] = useState<JobData[]>(dummyJobs);

  // Filters
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedEmployer, setSelectedEmployer] = useState<string>('All');
  const [postedRange, setPostedRange] = useState<'24h' | '7d' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch all jobs once
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

  // Apply filters
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
                <div className="rounded-lg bg-black/80 p-6">
                  <h1 className="text-white text-xl font-semibold mb-3">Find your next job</h1>

                  {/* Search */}
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 mb-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search title, company, skills…"
                      className="w-full md:flex-1 px-3 py-2 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <button
                      type="button"
                      onClick={clearAll}
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-200 hover:bg-gray-700 hover:text-white">
                      Clear All
                    </button>
                  </div>

                  {/* Categories as text links (no button background) */}
                  <div className="flex flex-wrap gap-3 items-center">
                    <span
                      role="button"
                      tabIndex={0}
                      aria-pressed={activeCategory === 'All'}
                      onClick={() => setActiveCategory('All')}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') setActiveCategory('All');
                      }}
                      className={`${
                        activeCategory === 'All'
                          ? 'text-amber-300 font-semibold'
                          : 'text-gray-300 hover:text-white'
                      } text-sm cursor-pointer select-none`}>
                      All
                    </span>
                    {categories.map(category => (
                      <span
                        key={`category-${category}`}
                        role="button"
                        tabIndex={0}
                        aria-pressed={activeCategory === category}
                        onClick={() => setActiveCategory(category)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') setActiveCategory(category);
                        }}
                        className={`${
                          activeCategory === category
                            ? 'text-amber-300 font-semibold'
                            : 'text-gray-300 hover:text-white'
                        } text-sm cursor-pointer select-none`}>
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Locations */}
                  <div className="mt-4">
                    <h3 className="text-white text-sm font-semibold mb-2">Locations</h3>
                    <div className="flex flex-col gap-2">
                      <span
                        role="button"
                        tabIndex={0}
                        aria-pressed={selectedLocation === 'All'}
                        onClick={() => setSelectedLocation('All')}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') setSelectedLocation('All');
                        }}
                        className={`${
                          selectedLocation === 'All'
                            ? 'text-amber-300 font-semibold'
                            : 'text-gray-200 hover:text-white'
                        } text-sm cursor-pointer select-none`}>
                        All locations
                      </span>
                      {locations.map(loc => (
                        <span
                          key={`loc-${loc}`}
                          role="button"
                          tabIndex={0}
                          aria-pressed={selectedLocation === loc}
                          onClick={() => setSelectedLocation(loc)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') setSelectedLocation(loc);
                          }}
                          className={`${
                            selectedLocation === loc
                              ? 'text-amber-300 font-semibold'
                              : 'text-gray-200 hover:text-white'
                          } text-sm cursor-pointer select-none`}>
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Employers */}
                  <div className="mt-4">
                    <h3 className="text-white text-sm font-semibold mb-2">Employers</h3>
                    <div className="flex flex-col gap-2">
                      <span
                        role="button"
                        tabIndex={0}
                        aria-pressed={selectedEmployer === 'All'}
                        onClick={() => setSelectedEmployer('All')}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') setSelectedEmployer('All');
                        }}
                        className={`${
                          selectedEmployer === 'All'
                            ? 'text-amber-300 font-semibold'
                            : 'text-gray-200 hover:text-white'
                        } text-sm cursor-pointer select-none`}>
                        All companies
                      </span>
                      {employers.map(emp => (
                        <span
                          key={`emp-${emp}`}
                          role="button"
                          tabIndex={0}
                          aria-pressed={selectedEmployer === emp}
                          onClick={() => setSelectedEmployer(emp)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') setSelectedEmployer(emp);
                          }}
                          className={`${
                            selectedEmployer === emp
                              ? 'text-amber-300 font-semibold'
                              : 'text-gray-200 hover:text-white'
                          } text-sm cursor-pointer select-none`}>
                          {emp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Posted date */}
                  <div className="mt-4">
                    <h3 className="text-white text-sm font-semibold mb-2">Posted</h3>
                    <div className="flex flex-col gap-2">
                      {(
                        [
                          { key: 'all', label: 'All time' },
                          { key: '24h', label: 'Last 24 hours' },
                          { key: '7d', label: 'Last 7 days' },
                        ] as const
                      ).map(opt => (
                        <span
                          key={opt.key}
                          role="button"
                          tabIndex={0}
                          aria-pressed={postedRange === opt.key}
                          onClick={() => setPostedRange(opt.key)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') setPostedRange(opt.key);
                          }}
                          className={`${
                            postedRange === opt.key
                              ? 'text-amber-300 font-semibold'
                              : 'text-gray-200 hover:text-white'
                          } text-sm cursor-pointer select-none`}>
                          {opt.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
