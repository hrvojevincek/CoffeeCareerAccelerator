import { default as moment } from 'moment';
import { Link } from 'react-router-dom';

import { type JobData } from '../types/types';

// Configure moment with English locale
moment.locale('en-US');

interface FeaturedJobsProps {
  jobs: JobData[];
}

export default function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <div className="p-6 rounded-lg shadow-md bg-black/80">
      <h2 className="text-2xl font-semibold border-b pb-4 text-white">Featured Jobs</h2>
      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2">
        {jobs.map(job => (
          <div className="border rounded-xl p-6 bg-white shadow-sm" key={job.id}>
            <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
              <div className="mb-2 text-xl font-semibold">{job.title}</div>
              <div className="text-slate-500 text-sm mb-2 sm:mb-0">
                Posted {moment(job.createdAt).fromNow()}
              </div>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <div className="text-lg">{job.employer?.name || 'Company'}</div>
              <div className="ms-2 py-1 px-2 rounded-full text-xs bg-slate-100">{job.category}</div>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <div className="text-slate-600 text-sm flex gap-1 items-center">
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>{' '}
                {job.location}
              </div>
            </div>

            <div className="border-t pt-4">
              <Link to={`/jobs/${job.id}`} className="text-blue-600 flex items-center justify-end">
                View Details{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
