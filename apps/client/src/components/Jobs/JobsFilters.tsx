type PostedRange = '24h' | '7d' | 'all';

interface JobsFiltersProps {
  categories: string[];
  locations: string[];
  employers: string[];
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedEmployer: string;
  setSelectedEmployer: (value: string) => void;
  postedRange: PostedRange;
  setPostedRange: (value: PostedRange) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  clearAll: () => void;
}

export default function JobsFilters({
  categories,
  locations,
  employers,
  activeCategory,
  setActiveCategory,
  selectedLocation,
  setSelectedLocation,
  selectedEmployer,
  setSelectedEmployer,
  postedRange,
  setPostedRange,
  searchQuery,
  setSearchQuery,
  clearAll,
}: JobsFiltersProps) {
  return (
    <div className="rounded-lg p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 text-white">
      {/* Search */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search…"
          className="w-full md:flex-1 px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="button"
          onClick={clearAll}
          className="px-4 py-2 rounded-md border border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white">
          Clear All
        </button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
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

      {/* Reset button at the end */}
      <div className="mt-6">
        <button
          type="button"
          onClick={clearAll}
          className="w-full px-4 py-2 rounded-md border border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white">
          Reset
        </button>
      </div>
    </div>
  );
}
