import { default as moment } from 'moment';
import { Link } from 'react-router-dom';

import { type JobData } from '../types/types';

// Configure moment with English locale
moment.locale('en-US');

interface FeaturedJobsProps {
  jobs: JobData[];
}

function getEmployerInitial(name?: string): string {
  const firstChar = name?.trim().charAt(0);
  return (firstChar ?? 'C').toUpperCase();
}

export default function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <div className="p-0">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {jobs.map(job => {
          const postedFromNow = moment(job.createdAt).fromNow();
          const isNew = moment().diff(moment(job.createdAt), 'hours') < 48;
          const employerName = job.employer?.name || 'Company';
          const descriptionSnippet = job.description
            ? `${job.description.slice(0, 100)}${job.description.length > 100 ? '…' : ''}`
            : '';
          return (
            <div
              className="border rounded-xl p-6 bg-white shadow-sm flex flex-col min-h-64"
              key={job.id}>
              <div className="flex flex-col mb-2 gap-1">
                <h3 className="text-2xl font-bold text-gray-900 truncate leading-tight">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  {isNew && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      New
                    </span>
                  )}
                  <span>Posted {postedFromNow}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-semibold">
                  {getEmployerInitial(employerName)}
                </div>
                <div className="text-lg font-medium text-gray-800">{employerName}</div>
                <span className="ms-2 px-2.5 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800">
                  {job.category}
                </span>
              </div>

              <div className="text-slate-600 text-sm mb-4 line-clamp-3">{descriptionSnippet}</div>

              <div className="mt-auto">
                <div className="flex items-center justify-between text-slate-600 text-sm mb-4">
                  <div className="flex gap-1 items-center">
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
                    </svg>
                    <span>{job.location}</span>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-end">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                    View Details
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
